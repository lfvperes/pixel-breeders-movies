import { useState, useEffect } from "react";
import { getRating, createRating, updateRating, deleteRating } from "../services/api";
import type { Rating } from "../types";

export function useRating(movieId: number | null, movieTitle: string, posterPath: string | null) {
  const [rating, setRating] = useState<Rating | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // load existing rating when modal opens
  useEffect(() => {
    if (!movieId) {
      setRating(null);
      return;
    }

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getRating(movieId);
        setRating(res.data);
      } catch (err: any) {
        // 404 just means not rated yet — not a real error
        if (err.response?.status !== 404) {
          setError("Failed to load rating.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [movieId]);

  const submitRating = async (value: number) => {
    if (!movieId) return;
    setSaving(true);
    setError(null);
    try {
      if (rating) {
        const res = await updateRating(movieId, value);
        setRating(res.data);
      } else {
        const res = await createRating({
          movie_id: movieId,
          title: movieTitle,
          poster_path: posterPath,
          rating: value,
        });
        setRating(res.data);
      }
    } catch {
      setError("Failed to save rating.");
    } finally {
      setSaving(false);
    }
  };

  const removeRating = async () => {
    if (!movieId || !rating) return;
    setSaving(true);
    setError(null);
    try {
      await deleteRating(movieId);
      setRating(null);
    } catch {
      setError("Failed to delete rating.");
    } finally {
      setSaving(false);
    }
  };

  return { rating, loading, saving, error, submitRating, removeRating };
}