from flask import Blueprint, request
from flask_login import current_user
from ..models import User, Item

item_routes = Blueprint('items', __name__)

@item_routes.route('')
def items():
    items = Item.query.all()
    return {'items': [item.to_dict() for item in items]}

@item_routes.route('/current')
def items():
    items = Item.query.filter(Item.user_id == current_user.id)
    return {'items': [item.to_dict() for item in items]}

@item_routes.route('/<int:id>')
def item(id):
    item = Item.query.get(id)
    return item.to_dict()