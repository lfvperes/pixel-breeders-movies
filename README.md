# 🎬 Pixel Breeders Movies

A movie search and rating app built with React + TypeScript and Python + Flask, powered by the [TMDB API](https://www.themoviedb.org/).

## Features

- Search movies via the TMDB public API
- View movie details: synopsis, release date, and cast
- Rate movies from 1 to 5 stars
- Edit or delete your ratings
- Browse all your rated movies in a dedicated page

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React, TypeScript, Vite, TailwindCSS |
| Backend   | Python, Flask, SQLAlchemy           |
| Database  | SQLite                              |
| Container | Docker, Docker Compose              |

## Requirements

- [Docker](https://www.docker.com/) and Docker Compose
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

## Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd pixel-breeders-movies
```

### 2. Configure environment variables
```bash
cp .env.example .env
```

Open `.env` and fill in your TMDB API key:
```
TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

### 3. Run the app
```bash
docker compose up --build
```

The first build will take a minute or two. After that:

| Service  | URL                    |
|----------|------------------------|
| Frontend | http://localhost:5173  |
| Backend  | http://localhost:5000  |

### Stopping the app
```bash
docker compose down
```

To also delete the database volume:
```bash
docker compose down -v
```

## Running locally without Docker

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```