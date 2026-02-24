import type { Movie } from "../types";
import { MovieCard } from "./MovieCard";

interface Props {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  onMovieClick: (movie: Movie) => void;
}

function SkeletonCard() {
  return (
    <div className="rounded-lg overflow-hidden bg-gray-800 animate-pulse">
      <div className="aspect-[2/3] bg-gray-700" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-700 rounded w-4/5" />
        <div className="h-3 bg-gray-700 rounded w-1/3" />
      </div>
    </div>
  );
}

export function MovieGrid({ movies, loading, error, onMovieClick }: Props) {
  if (error) {
    return (
      <p className="text-center text-red-400 mt-12">{error}</p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
      {loading && Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}