import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { MovieGrid } from "../components/MovieGrid";
import { MovieModal } from "../components/MovieModal";
import { useMovieSearch } from "../hooks/useMovieSearch";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import type { Movie } from "../types";

export function HomePage() {
  const { query, setQuery, movies, loading, error, loadMore, hasMore } = useMovieSearch();
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const sentinelRef = useInfiniteScroll(loadMore, hasMore && !loading);

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

        {/* sentinel — invisible div that triggers the next page load */}
        <div ref={sentinelRef} className="h-1" />

        {/* spinner shown while loading more pages */}
        {loading && movies.length > 0 && (
          <div className="flex justify-center mt-6">
            <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* end of results message */}
        {!hasMore && movies.length > 0 && !loading && (
          <p className="text-center text-gray-600 text-sm mt-8">
            No more results
          </p>
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