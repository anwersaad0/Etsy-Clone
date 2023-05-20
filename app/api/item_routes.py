from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import User, Item, db
from ..forms import NewItem, EditItem

item_routes = Blueprint('items', __name__)

@item_routes.route('')
def items():
    items = Item.query.all()
    return {'items': [item.to_dict() for item in items]}

@item_routes.route('/current')
@login_required
def user_items():
    items = Item.query.filter(Item.user_id == current_user.id)
    return {'items': [item.to_dict() for item in items]}

@item_routes.route('/<int:id>')
def item(id):
    item = Item.query.get(id)
    return item.to_dict()

@item_routes.route('/new', methods=['POST'])
@login_required
def add_item():
    form = NewItem()

    #print('============= Route has been hit =================')

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        #print('================== VALIDATING ================')
        item = Item(name = form.data['name'],
                    user_id = current_user.id,
                    price = form.data['price'],
                    description = form.data['description'],
                    rating = 0
                    )
        
        db.session.add(item)
        db.session.commit()
        return item.to_dict()
    
    return {"errors": form.errors}

@item_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_item(id):
    item = Item.query.get(id)
    if not item:
        return {"error": "Item not found!"}
    
    form = EditItem()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        item.name = form.data['name']
        item.price = form.data['price']
        item.description = form.data['description']

        db.session.commit()
        return item.to_dict()
    
    return {"errors": form.errors}

@item_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_item(id):
    item = Item.query.get(id)
    if item.user_id == current_user.id:
        db.session.delete(item)
        db.session.commit()
        return "Delete Successful"
    else:
        return "Must be the item's owner to delete this item"
