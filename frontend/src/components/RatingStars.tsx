import { useState } from "react";

interface Props {
  current: number | null;
  saving: boolean;
  onRate: (value: number) => void;
  onDelete: () => void;
}

export function RatingStars({ current, saving, onRate, onDelete }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  const display = hovered ?? current ?? 0;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-gray-400">
        {current ? "Your rating — click to change:" : "Rate this movie:"}
      </p>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            disabled={saving}
            onClick={() => onRate(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            className="text-3xl transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Rate ${star} out of 5`}
          >
            <span className={display >= star ? "text-yellow-400" : "text-gray-600"}>
              ★
            </span>
          </button>
        ))}

        {current && (
          <span className="ml-2 text-gray-400 text-sm font-medium">
            {current}/5
          </span>
        )}
      </div>

      {current && (
        <button
          onClick={onDelete}
          disabled={saving}
          className="text-xs text-red-400 hover:text-red-300 transition-colors self-start disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Remove rating"}
        </button>
      )}

      {saving && !current && (
        <p className="text-xs text-gray-500">Saving...</p>
      )}
    </div>
  );
}