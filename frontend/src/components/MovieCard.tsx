import type { Movie } from "../types";

const POSTER_BASE = "https://image.tmdb.org/t/p/w300";
const FALLBACK = "https://placehold.co/300x450?text=No+Image";

interface Props {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export function MovieCard({ movie, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(movie)}
      className="cursor-pointer group rounded-lg overflow-hidden bg-gray-800 hover:ring-2 hover:ring-yellow-400 transition-all duration-200"
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster_path ? `${POSTER_BASE}${movie.poster_path}` : FALLBACK}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3">
        <p className="text-white text-sm font-medium line-clamp-2 leading-snug">
          {movie.title}
        </p>
        {movie.release_date && (
          <p className="text-gray-400 text-xs mt-1">
            {movie.release_date.slice(0, 4)}
          </p>
        )}
      </div>
    </div>
  );
}