from flask import Blueprint, request
from flask_login import current_user
from ..models import User, Item, db
from ..forms import NewItem

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

@item_routes.route('/new', methods=['POST'])
def add_item():
    form = NewItem()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        item = Item(name = form.data['name'],
                    owner_id = current_user.id,
                    price = form.data['price'],
                    description = form.data['description'],
                    rating = 0
                    )
        
        db.session.add(item)
        db.session.commit()
        return item.to_dict()
    
    return {"errors": form.errors}

