import { useEffect } from "react";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { useRating } from "../hooks/useRating";
import { RatingStars } from "./RatingStars";

const POSTER_BASE = "https://image.tmdb.org/t/p/w300";
const PROFILE_BASE = "https://image.tmdb.org/t/p/w185";
const FALLBACK_POSTER = "https://placehold.co/300x450?text=No+Image";
const FALLBACK_PROFILE = "https://placehold.co/185x278?text=N/A";

interface Props {
  movieId: number | null;
  onClose: () => void;
}

export function MovieModal({ movieId, onClose }: Props) {
  const { movie, loading, error } = useMovieDetail(movieId);
  const { rating, saving, error: ratingError, submitRating, removeRating } =
    useRating(movieId, movie?.title ?? "", movie?.poster_path ?? null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-end p-4 pb-0">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-400 py-24">{error}</p>
        )}

        {/* Content */}
        {movie && !loading && (
          <div className="px-6 pb-8">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Poster */}
              <img
                src={movie.poster_path ? `${POSTER_BASE}${movie.poster_path}` : FALLBACK_POSTER}
                alt={movie.title}
                className="w-40 rounded-lg shrink-0 self-start mx-auto sm:mx-0"
              />

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{movie.title}</h2>

                {movie.release_date && (
                  <p className="text-gray-400 text-sm mt-1">
                    Released: {new Date(movie.release_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}

                <p className="text-gray-300 text-sm mt-4 leading-relaxed">
                  {movie.overview || "No synopsis available."}
                </p>

                {/* Rating */}
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <RatingStars
                    current={rating?.rating ?? null}
                    saving={saving}
                    onRate={submitRating}
                    onDelete={removeRating}
                  />
                  {ratingError && (
                    <p className="text-red-400 text-xs mt-2">{ratingError}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Cast */}
            {movie.credits?.cast?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Cast</h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {movie.credits.cast.slice(0, 15).map((member) => (
                    <div key={member.id} className="shrink-0 w-20 text-center">
                      <img
                        src={member.profile_path ? `${PROFILE_BASE}${member.profile_path}` : FALLBACK_PROFILE}
                        alt={member.name}
                        className="w-20 h-20 object-cover rounded-full mx-auto"
                      />
                      <p className="text-white text-xs mt-2 font-medium leading-tight">
                        {member.name}
                      </p>
                      <p className="text-gray-400 text-xs leading-tight">
                        {member.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}