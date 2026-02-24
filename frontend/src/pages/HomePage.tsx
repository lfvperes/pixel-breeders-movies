import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { MovieGrid } from "../components/MovieGrid";
import { MovieModal } from "../components/MovieModal";
import { useMovieSearch } from "../hooks/useMovieSearch";
import type { Movie } from "../types";

export function HomePage() {
  const { query, setQuery, movies, loading, error, loadMore, hasMore } = useMovieSearch();
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Find your next movie
        </h1>

        <SearchBar value={query} onChange={setQuery} />

        {!query.trim() && !loading && (
          <p className="text-center text-gray-500 mt-20 text-lg">
            Start typing to search for movies...
          </p>
        )}

        <MovieGrid
          movies={movies}
          loading={loading}
          error={error}
          onMovieClick={(movie: Movie) => setSelectedMovieId(movie.id)}
        />

        {hasMore && !loading && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors"
            >
              Load more
            </button>
          </div>
        )}
      </div>

      {selectedMovieId && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
}