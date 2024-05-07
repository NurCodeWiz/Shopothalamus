from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, DecimalField, TextAreaField
from wtforms.validators import InputRequired, Length, NumberRange

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[InputRequired(), Length(max=255)])
    description = TextAreaField('Description')
    category = StringField('Category', validators=[InputRequired(), Length(max=255)])
    price = DecimalField('Price', validators=[InputRequired(), NumberRange(min=0)])
    image = FileField(validators=[FileAllowed(['jpg', 'png', 'jpeg', 'gif', 'webp'])])
