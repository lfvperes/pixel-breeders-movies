from flask import Flask
from flask_cors import CORS
from app.extensions import db
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)

    with app.app_context():
        from app.models import rating
        db.create_all()

    from app.routes.ratings import ratings_bp
    app.register_blueprint(ratings_bp)

    @app.get("/health")
    def health():
        return {"status": "ok"}

    return app