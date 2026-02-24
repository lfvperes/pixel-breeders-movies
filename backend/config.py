import os
from pathlib import Path

class Config:
    # Create database in instance folder (recommended for Flask)
    basedir = Path(__file__).parent
    db_path = basedir / 'instance' / 'movies.db'
    os.makedirs(db_path.parent, exist_ok=True)  # Create directory if it doesn't exist

    SQLALCHEMY_DATABASE_URI = f'sqlite:///{db_path}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TMDB_API_KEY = os.getenv("TMDB_API_KEY")