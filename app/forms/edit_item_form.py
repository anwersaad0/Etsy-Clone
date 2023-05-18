from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField
from wtforms.validators import DataRequired, ValidationError

from app.models import User, Item

def item_exists(form, field):
    new_item_name = field.data
    item = Item.query.filter(Item.name == new_item_name).first()
    if item:
        raise ValidationError("This item already exists!")
    
class EditItem(FlaskForm):
    name = StringField("Item Name", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])

    price = FloatField("Item Price", validators=[DataRequired()])