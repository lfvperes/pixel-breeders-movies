import type { Rating } from "../types";

const POSTER_BASE = "https://image.tmdb.org/t/p/w300";
const FALLBACK = "https://placehold.co/300x450?text=No+Image";

interface Props {
  ratedMovie: Rating;
  onClick: (movieId: number) => void;
}

export function RatedMovieCard({ ratedMovie, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(ratedMovie.movie_id)}
      className="cursor-pointer group rounded-lg overflow-hidden bg-gray-800 hover:ring-2 hover:ring-yellow-400 transition-all duration-200"
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={ratedMovie.poster_path ? `${POSTER_BASE}${ratedMovie.poster_path}` : FALLBACK}
          alt={ratedMovie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3">
        <p className="text-white text-sm font-medium line-clamp-2 leading-snug">
          {ratedMovie.title}
        </p>
        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-base ${star <= ratedMovie.rating ? "text-yellow-400" : "text-gray-600"}`}
            >
              ★
            </span>
          ))}
          <span className="text-gray-400 text-xs ml-1">{ratedMovie.rating}/5</span>
        </div>
      </div>
    </div>
  );
}