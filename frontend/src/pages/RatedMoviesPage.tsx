import { useState } from "react";
import { useAllRatings } from "../hooks/useAllRatings";
import { RatedMovieCard } from "../components/RatedMovieCard";
import { MovieModal } from "../components/MovieModal";

export function RatedMoviesPage() {
  const { ratings, loading, error, refresh } = useAllRatings();
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const handleClose = () => {
    setSelectedMovieId(null);
    refresh();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">
          Rated Movies
        </h1>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center mt-20">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-400 mt-20">{error}</p>
        )}

        {/* Empty state */}
        {!loading && !error && ratings.length === 0 && (
          <p className="text-center text-gray-500 mt-20 text-lg">
            You haven't rated any movies yet.{" "}
            <a href="/" className="text-yellow-400 hover:underline">
              Search for one!
            </a>
          </p>
        )}

        {/* Grid */}
        {!loading && ratings.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {ratings.map((r) => (
              <RatedMovieCard
                key={r.movie_id}
                ratedMovie={r}
                onClick={setSelectedMovieId}
              />
            ))}
          </div>
        )}
      </div>

      {selectedMovieId && (
        <MovieModal movieId={selectedMovieId} onClose={handleClose} />
      )}
    </div>
  );
}