from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import Item, Cart, db

cart_routes = Blueprint('carts', __name__)

@cart_routes.route('/current')
@login_required
def user_cart():
    cart = Cart.query.filter(Cart.user_id == current_user.id)
    return cart.to_dict()