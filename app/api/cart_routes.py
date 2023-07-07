from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import Item, carts, db

cart_routes = Blueprint('carts', __name__)

@cart_routes.route('/current')
@login_required
def user_cart():

    #print(">>> TESTING >>>", carts)
    #user_items = carts.query.filter(carts.user_id == current_user.id)
    return current_user.to_cart()