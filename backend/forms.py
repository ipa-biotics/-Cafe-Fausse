from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class ReservationForm(FlaskForm):
    name = StringField(
        "Full Name",
        validators=[
            DataRequired(message="A full name is required."),
            Length(
                max=100,
                message="The full name is too long.",
            ),
        ],
    )

    email = StringField(
        "Email Address",
        validators=[
            DataRequired(message="An email address is required."),
            Length(
                max=150,
                message="The email address is too long.",
            ),
        ],
    )

    phone = StringField(
        "Phone Number",
        validators=[
            Length(
                max=20,
                message="The phone number is too long.",
            ),
        ],
    )


class NewsletterForm(FlaskForm):
    email = StringField(
        "Email Address",
        validators=[
            DataRequired(message="An email address is required."),
            Length(
                max=150,
                message="The email address is too long.",
            ),
        ],
    )