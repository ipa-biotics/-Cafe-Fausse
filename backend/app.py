import os

from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import URL
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


# Basic routes

@app.route("/")
def home():
    return {"message": "Cafe Fausse API is running"}


@app.route("/database-check")
def database_check():
    table_count = RestaurantTable.query.count()
    customer_count = Customer.query.count()
    reservation_count = Reservation.query.count()

    return {
        "message": "Database connection successful",
        "restaurant_tables": table_count,
        "customers": customer_count,
        "reservations": reservation_count,
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

    for character in email:
        if character.isspace():
            return {"message": "Please enter a valid email address."}, 400

    if email.count("@") != 1:
        return {"message": "Please enter a valid email address."}, 400

    local_part, domain = email.split("@")

    if (
        local_part == ""
        or "." not in domain
        or domain.startswith(".")
        or domain.endswith(".")
        or ".." in domain
    ):
        return {"message": "Please enter a valid email address."}, 400

    try:
        customer = Customer.query.filter_by(
            email_address=email
        ).first()

        if customer is not None:
            customer.newsletter_signup = True
        else:
            customer = Customer(
                email_address=email,
                newsletter_signup=True,
            )
            db.session.add(customer)

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