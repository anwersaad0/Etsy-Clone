from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import Review, db
from ..forms import NewReview, EditReview

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    review = Review.query.get(id)
    if not review:
        return {"error": "Review not found!"}
    
    form = EditReview()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.review = form.data['review']
        review.rating = form.data['rating']

        db.session.commit()
        return review.to_dict()
    
    return {"errors": form.errors}

@review_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if review.user_id == current_user.id:
        db.session.delete(review)
        db.session.commit()
        return "Delete Successful"
    else:
        return "Must be the review's owner to delete this review"