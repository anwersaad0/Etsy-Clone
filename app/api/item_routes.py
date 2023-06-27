from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import User, Item, Review, carts, db
from ..forms import NewItem, EditItem, NewReview

from ..api.aws_image_helpers import get_unique_image_filename, upload_file_to_s3
from sqlalchemy import select

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

@item_routes.route('/<int:id>/reviews')
def item_reviews(id):
    item = Item.query.get(id)
    reviews = Review.query.filter(Review.item_id == item.id)
    return {'reviews': [review.to_dict() for review in reviews]}

@item_routes.route('/<int:id>')
def item(id):
    item = Item.query.get(id)

    return item.to_dict()

@item_routes.route('<int:id>/cart/<int:user_id>', methods=['POST'])
@login_required
def add_to_cart(id, user_id):
    item = Item.query.get(id)
    if not item:
        return {'error': 'item not found'}
    
    user = User.query.get(user_id)
    if not user:
        return {'error': 'user not found'}
    
    query = select([carts]).where(
        (carts.c.user_id == user_id) & (carts.c.item_id == id)
    )

    res = db.session.execute(query)

    in_cart = res.fetchone() is not None

    if in_cart:
        item.user_cart.remove(user)
        db.session.commit()
        return item.to_dict()
    else:
        item.user_cart.append(user)
        db.session.commit()
        return item.to_dict()


@item_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def add_item_review(id):
    item = Item.query.get(id)

    form = NewReview()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review(review = form.data['review'],
                        rating = form.data['rating'],
                        item_id = item.id,
                        user_id = current_user.id
                        )
        
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    
    return {"errors": form.errors}

@item_routes.route('/new', methods=['POST'])
@login_required
def add_item():
    form = NewItem()

    #print('============= Route has been hit =================')

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        #print('================== VALIDATING ================')
        item_image = form.data['image']
        item_image.filename = get_unique_image_filename(item_image.filename)
        image_upload = upload_file_to_s3(item_image)

        item = Item(name = form.data['name'],
                    user_id = current_user.id,
                    price = form.data['price'],
                    description = form.data['description'],
                    rating = 0,
                    image = image_upload['url']
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
