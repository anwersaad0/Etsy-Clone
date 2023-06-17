from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import User, Item, db

cart_routes = Blueprint('carts', __name__)