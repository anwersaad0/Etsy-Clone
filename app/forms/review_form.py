from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError

from app.models import Review

def review_exists(form, field):
    new_review = field.data
    review = Review.query.filter(Review.review == new_review).first()
    if review:
        raise ValidationError("This review already exists!")

class NewReview(FlaskForm):
    review = StringField("Write Review Here", validators=[DataRequired()])
    rating = IntegerField("Rating", validators=[DataRequired()])

    submit = SubmitField("Submit Review")