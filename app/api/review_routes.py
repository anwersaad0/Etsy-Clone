from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import Review, db
from ..forms import NewReview, EditReview

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    review = Review.query.get(id)

#@review_routes.route('')