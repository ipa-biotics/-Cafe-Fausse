import os
import random
from datetime import datetime, timedelta

from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import URL, text
from sqlalchemy.exc import IntegrityError, SQLAlchemyError


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = URL.create(
    "postgresql+psycopg2",
    username=os.environ["DB_USER"],
    password=os.environ["DB_PASSWORD"],
    host=os.environ.get("DB_HOST", "localhost"),
    port=int(os.environ.get("DB_PORT", "5432")),
    database=os.environ["DB_NAME"],
)

db = SQLAlchemy(app)

RESERVATION_DURATION = timedelta(minutes=90)


# Database models

class Customer(db.Model):
    __tablename__ = "customers"

    customer_id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100))

    email_address = db.Column(
        db.String(150),
        nullable=False,
        unique=True,
    )

    phone_number = db.Column(db.String(20))

    newsletter_signup = db.Column(
        db.Boolean,
        nullable=False,
        default=False,
    )


class RestaurantTable(db.Model):
    __tablename__ = "restaurant_tables"

    table_number = db.Column(db.Integer, primary_key=True)
    capacity = db.Column(db.Integer, nullable=False)
    min_online_guests = db.Column(db.Integer, nullable=False)
    max_online_guests = db.Column(db.Integer, nullable=False)


class Reservation(db.Model):
    __tablename__ = "reservations"

    reservation_id = db.Column(db.Integer, primary_key=True)

    customer_id = db.Column(
        db.Integer,
        db.ForeignKey("customers.customer_id"),
        nullable=False,
    )

    time_slot = db.Column(db.DateTime, nullable=False)
    number_of_guests = db.Column(db.Integer, nullable=False)

    table_number = db.Column(
        db.Integer,
        db.ForeignKey("restaurant_tables.table_number"),
        nullable=False,
    )

    status = db.Column(
        db.String(20),
        nullable=False,
        default="confirmed",
    )


# Email validation

def is_valid_email(email):
    if email == "" or len(email) > 150:
        return False

    for character in email:
        if character.isspace():
            return False

    if email.count("@") != 1:
        return False

    local_part, domain = email.split("@")

    return (
        local_part != ""
        and "." in domain
        and not domain.startswith(".")
        and not domain.endswith(".")
        and ".." not in domain
    )


# Reservation availability helpers

def reservations_overlap(existing_start, requested_start):
    existing_end = existing_start + RESERVATION_DURATION
    requested_end = requested_start + RESERVATION_DURATION

    return (
        existing_start < requested_end
        and existing_end > requested_start
    )


def find_eligible_tables(number_of_guests):
    return RestaurantTable.query.filter(
        RestaurantTable.min_online_guests <= number_of_guests,
        RestaurantTable.max_online_guests >= number_of_guests,
    ).all()


def find_table_reservations(table_number, requested_start):
    earliest_start = requested_start - RESERVATION_DURATION
    latest_start = requested_start + RESERVATION_DURATION

    return Reservation.query.filter(
        Reservation.table_number == table_number,
        Reservation.status != "cancelled",
        Reservation.time_slot > earliest_start,
        Reservation.time_slot < latest_start,
    ).all()


def is_table_available(table_number, requested_start):
    reservations = find_table_reservations(
        table_number,
        requested_start,
    )

    for reservation in reservations:
        if reservations_overlap(
            reservation.time_slot,
            requested_start,
        ):
            return False

    return True


def find_available_tables(number_of_guests, requested_start):
    eligible_tables = find_eligible_tables(number_of_guests)
    available_tables = []

    for table in eligible_tables:
        if is_table_available(table.table_number, requested_start):
            available_tables.append(table)

    return available_tables


def choose_table(available_tables):
    if not available_tables:
        return None

    smallest_capacity = min(
        table.capacity for table in available_tables
    )

    priority_tables = []

    for table in available_tables:
        if table.capacity == smallest_capacity:
            priority_tables.append(table)

    return random.choice(priority_tables)


# Reservation date and time helpers

def get_closing_hour(requested_start):
    if requested_start.weekday() == 6:
        return 21

    return 23


def is_within_opening_hours(requested_start):
    opening_time = requested_start.replace(
        hour=17,
        minute=0,
        second=0,
        microsecond=0,
    )

    closing_time = requested_start.replace(
        hour=get_closing_hour(requested_start),
        minute=0,
        second=0,
        microsecond=0,
    )

    requested_end = requested_start + RESERVATION_DURATION

    return (
        requested_start >= opening_time
        and requested_end <= closing_time
    )


def is_valid_time_slot(requested_start):
    return (
        requested_start.minute in (0, 30)
        and requested_start.second == 0
        and requested_start.microsecond == 0
    )


def is_future_reservation(requested_start, current_time):
    return requested_start > current_time


def get_restaurant_time():
    return db.session.execute(
        text(
            "SELECT clock_timestamp() "
            "AT TIME ZONE 'America/New_York'"
        )
    ).scalar_one()


# Basic routes

@app.route("/")
def home():
    return {"message": "Cafe Fausse API is running"}


@app.route("/database-check")
def database_check():
    return {
        "message": "Database connection successful",
        "restaurant_tables": RestaurantTable.query.count(),
        "customers": Customer.query.count(),
        "reservations": Reservation.query.count(),
    }


# Newsletter subscription

@app.route("/api/newsletter", methods=["POST"])
def subscribe_newsletter():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return {"message": "A JSON object is required."}, 400

    email = data.get("email")

    if not isinstance(email, str):
        return {"message": "An email address is required."}, 400

    email = email.strip().lower()

    if email == "":
        return {"message": "An email address is required."}, 400

    if len(email) > 150:
        return {"message": "The email address is too long."}, 400

    if not is_valid_email(email):
        return {"message": "Please enter a valid email address."}, 400

    try:
        customer = Customer.query.filter_by(
            email_address=email
        ).first()

        if customer is None:
            customer = Customer(
                email_address=email,
                newsletter_signup=True,
            )
            db.session.add(customer)
        else:
            customer.newsletter_signup = True

        db.session.commit()

    except IntegrityError:
        db.session.rollback()

        return {
            "message": "A data conflict occurred. Please try again."
        }, 409

    except SQLAlchemyError:
        db.session.rollback()
        app.logger.exception("Newsletter subscription failed.")

        return {
            "message": "Unable to save your subscription. Please try again later."
        }, 500

    return {
        "message": "You are subscribed to our newsletter."
    }, 200


# Reservation creation

@app.route("/api/reservations", methods=["POST"])
def create_reservation():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return {"message": "A JSON object is required."}, 400

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    date = data.get("date")
    time = data.get("time")
    guests = data.get("guests")
    newsletter = data.get("newsletter", False)
    reservation_terms = data.get("reservationTerms", False)

    # Validate the guest's name.

    if not isinstance(name, str):
        return {"message": "A full name is required."}, 400

    name = name.strip()

    if name == "":
        return {"message": "A full name is required."}, 400

    if len(name) > 100:
        return {"message": "The full name is too long."}, 400

    # Validate the email address.

    if not isinstance(email, str):
        return {"message": "An email address is required."}, 400

    email = email.strip().lower()

    if not is_valid_email(email):
        return {"message": "Please enter a valid email address."}, 400

    # Validate the optional phone number.

    if phone is None:
        phone = ""

    if not isinstance(phone, str):
        return {"message": "The phone number must be text."}, 400

    phone = phone.strip()

    if len(phone) > 20:
        return {"message": "The phone number is too long."}, 400

    # Validate consent and newsletter preference.

    if reservation_terms is not True:
        return {
            "message": "You must accept the reservation terms."
        }, 400

    if not isinstance(newsletter, bool):
        return {
            "message": "The newsletter preference must be true or false."
        }, 400

    # Validate the number of guests.

    if type(guests) is not int:
        return {
            "message": "The number of guests must be an integer."
        }, 400

    if guests < 1 or guests > 8:
        return {
            "message": "Online reservations are available for 1 to 8 guests."
        }, 400

    # Convert the submitted date and time into a datetime.

    if not isinstance(date, str) or not isinstance(time, str):
        return {
            "message": "A reservation date and time are required."
        }, 400

    submitted_datetime = f"{date} {time}"

    try:
        requested_start = datetime.strptime(
            submitted_datetime,
            "%Y-%m-%d %H:%M",
        )
    except ValueError:
        return {
            "message": "Use YYYY-MM-DD for the date and HH:MM for the time."
        }, 400

    if requested_start.strftime("%Y-%m-%d %H:%M") != submitted_datetime:
        return {
            "message": "Use YYYY-MM-DD for the date and HH:MM for the time."
        }, 400

    if not is_valid_time_slot(requested_start):
        return {
            "message": "Reservations must start on the hour or half-hour."
        }, 400

    if not is_within_opening_hours(requested_start):
        return {
            "message": (
                "Please choose a time that allows a 90-minute meal "
                "within the restaurant's opening hours."
            )
        }, 400

    try:
        # Serialize reservation writes until commit or rollback.
        db.session.execute(
            text(
                "LOCK TABLE reservations "
                "IN SHARE ROW EXCLUSIVE MODE"
            )
        )

        current_time = get_restaurant_time()

        if not is_future_reservation(requested_start, current_time):
            db.session.rollback()

            return {
                "message": "Please choose a future reservation date and time."
            }, 400

        available_tables = find_available_tables(
            guests,
            requested_start,
        )

        selected_table = choose_table(available_tables)

        if selected_table is None:
            db.session.rollback()

            return {
                "message": (
                    "No suitable table is available at this time. "
                    "Please choose another time slot."
                )
            }, 409

        customer = Customer.query.filter_by(
            email_address=email
        ).first()

        if customer is None:
            customer = Customer(
                customer_name=name,
                email_address=email,
                phone_number=phone or None,
                newsletter_signup=newsletter,
            )
            db.session.add(customer)
        else:
            customer.customer_name = name

            if phone != "":
                customer.phone_number = phone

            if newsletter:
                customer.newsletter_signup = True

        # Obtain the new customer's ID without committing yet.
        db.session.flush()

        reservation = Reservation(
            customer_id=customer.customer_id,
            time_slot=requested_start,
            number_of_guests=guests,
            table_number=selected_table.table_number,
            status="confirmed",
        )

        db.session.add(reservation)
        db.session.flush()

        response_data = {
            "message": "Your reservation is confirmed.",
            "reservation": {
                "reservation_id": reservation.reservation_id,
                "date": requested_start.strftime("%Y-%m-%d"),
                "time": requested_start.strftime("%H:%M"),
                "guests": reservation.number_of_guests,
                "table_number": reservation.table_number,
                "status": reservation.status,
            },
        }

        db.session.commit()

        return response_data, 201

    except IntegrityError:
        db.session.rollback()

        return {
            "message": (
                "A data conflict occurred. "
                "Please submit your reservation again."
            )
        }, 409

    except SQLAlchemyError:
        db.session.rollback()
        app.logger.exception("Reservation creation failed.")

        return {
            "message": (
                "Unable to save your reservation. "
                "Please try again later."
            )
        }, 500