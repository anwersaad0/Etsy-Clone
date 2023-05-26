from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired

from app.api.aws_image_helpers import ALLOWED_IMAGE_EXTENSIONS

class NewItemImage(FlaskForm):
    url = FileField("Item Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_IMAGE_EXTENSIONS))])