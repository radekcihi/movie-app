"use client";

import { isFavorite, toggleFavorite } from "@/utils/favorites";
import { useState } from "react";
type Props = {
  movieId: string;
};
export default function Favorites({ movieId }: Props) {
  const [favorite, setFavorite] = useState(isFavorite(movieId));

  const handleToggleFavorite = (movieId: string) => {
    toggleFavorite(movieId);
    setFavorite(isFavorite(movieId));
  };

  return (
    <button
      onClick={() => handleToggleFavorite(movieId)}
      className={` m-2 p-2 rounded-full ${
        favorite ? "bg-red-200 text-black" : "bg-gray-200 text-gray-800"
      }`}
      aria-label="Toggle Favorite"
    >
      {favorite ? "★" : "☆"}
    </button>
  );
}
