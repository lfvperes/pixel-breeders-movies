from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.rating import Rating

ratings_bp = Blueprint("ratings", __name__, url_prefix="/ratings")


@ratings_bp.get("/")
def get_all_ratings():
    ratings = Rating.query.order_by(Rating.updated_at.desc()).all()
    return jsonify([r.to_dict() for r in ratings])


@ratings_bp.get("/<int:movie_id>")
def get_rating(movie_id):
    rating = Rating.query.filter_by(movie_id=movie_id).first()
    if not rating:
        return jsonify({"error": "Rating not found"}), 404
    return jsonify(rating.to_dict())


@ratings_bp.post("/")
def create_rating():
    data = request.get_json()

    required = ["movie_id", "title", "rating"]
    missing = [f for f in required if f not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    if not (1 <= data["rating"] <= 5):
        return jsonify({"error": "Rating must be between 1 and 5"}), 400

    existing = Rating.query.filter_by(movie_id=data["movie_id"]).first()
    if existing:
        return jsonify({"error": "Rating already exists, use PUT to update"}), 409

    rating = Rating(
        movie_id=data["movie_id"],
        title=data["title"],
        poster_path=data.get("poster_path"),
        rating=data["rating"],
    )
    db.session.add(rating)
    db.session.commit()
    return jsonify(rating.to_dict()), 201


@ratings_bp.put("/<int:movie_id>")
def update_rating(movie_id):
    rating = Rating.query.filter_by(movie_id=movie_id).first()
    if not rating:
        return jsonify({"error": "Rating not found"}), 404

    data = request.get_json()
    new_value = data.get("rating")

    if new_value is None:
        return jsonify({"error": "Missing field: rating"}), 400

    if not (1 <= new_value <= 5):
        return jsonify({"error": "Rating must be between 1 and 5"}), 400

    rating.rating = new_value
    db.session.commit()
    return jsonify(rating.to_dict())


@ratings_bp.delete("/<int:movie_id>")
def delete_rating(movie_id):
    rating = Rating.query.filter_by(movie_id=movie_id).first()
    if not rating:
        return jsonify({"error": "Rating not found"}), 404

    db.session.delete(rating)
    db.session.commit()
    return jsonify({"message": "Rating deleted successfully"})