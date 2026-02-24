import { useState, useEffect } from "react";
import { getMovieDetail } from "../services/tmdb";
import type { MovieDetail } from "../types";

export function useMovieDetail(movieId: number | null) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setMovie(null);
      return;
    }

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getMovieDetail(movieId);
        setMovie(res.data);
      } catch {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [movieId]);

  return { movie, loading, error };
}