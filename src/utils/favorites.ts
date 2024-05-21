export function getFavorites(): string[] {
  if (typeof window !== "undefined") {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  }
  return [];
}

export function isFavorite(movieId: string): boolean {
  const favorites = getFavorites();
  return favorites.includes(movieId);
}

export function toggleFavorite(movieId: string): void {
  const favorites = getFavorites();
  let updatedFavorites;

  if (favorites.includes(movieId)) {
    console.log("removing from favorites", movieId);
    updatedFavorites = favorites.filter((id) => id !== movieId);
  } else {
    updatedFavorites = [...favorites, movieId];
  }

  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
}
