from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, FloatField, SubmitField
from wtforms.validators import DataRequired, ValidationError

from app.models import User, Item
from app.api.aws_image_helpers import ALLOWED_IMAGE_EXTENSIONS

def item_exists(form, field):
    new_item_name = field.data
    item = Item.query.filter(Item.name == new_item_name).first()
    if item:
        raise ValidationError("This item already exists!")

class NewItem(FlaskForm):
    name = StringField("Item Name", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])

    price = FloatField("Item Price", validators=[DataRequired()])
    image = FileField("Item Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_IMAGE_EXTENSIONS))])

