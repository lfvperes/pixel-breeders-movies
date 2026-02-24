import { useState, useEffect, useCallback } from "react";
import { getAllRatings } from "../services/api";
import type { Rating } from "../types";

export function useAllRatings() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllRatings();
      setRatings(res.data);
    } catch {
      setError("Failed to load rated movies.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ratings, loading, error, refresh: fetch };
}