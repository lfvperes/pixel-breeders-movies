import { useState, useEffect, useCallback } from "react";
import { searchMovies } from "../services/tmdb";
import type { Movie } from "../types";
import { useDebounce } from "./useDebounce";

export function useMovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 500);

  // reset results when query changes
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setTotalPages(0);
  }, [debouncedQuery]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setMovies([]);
      return;
    }

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await searchMovies(debouncedQuery, page);
        setMovies((prev) =>
          page === 1 ? res.data.results : [...prev, ...res.data.results]
        );
        setTotalPages(res.data.total_pages);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [debouncedQuery, page]);

  const loadMore = useCallback(() => {
    if (!loading && page < totalPages) setPage((p) => p + 1);
  }, [loading, page, totalPages]);

  return { query, setQuery, movies, loading, error, loadMore, hasMore: page < totalPages };
}