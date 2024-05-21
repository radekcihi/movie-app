import axios from "axios";

export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type MovieDetails = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot: string;
  Actors: string;
  Director: string;
  Writer: string;
};

type FetchMoviesResponse = {
  movies: Movie[] | null;
  error: string | null;
  totalResults?: string;
};

type FetchMovieDetailsResponse = {
  movie: MovieDetails | null;
  error: string | null;
};

export async function fetchMovies(
  query: string,
  page: number = 1
): Promise<FetchMoviesResponse> {
  try {
    const response = await axios.get<{
      Search: Movie[];
      totalResults: string;
    }>(
      `http://www.omdbapi.com/?s=${query}&page=${page}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    if (response.data.Search) {
      return {
        movies: response.data.Search,
        error: null,
        totalResults: response.data.totalResults,
      };
    } else {
      return { movies: null, error: "No movies found" };
    }
  } catch (error) {
    console.error(error);

    let errorMessage = "An unexpected error occurred";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.Error || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { movies: null, error: errorMessage };
  }
}

export async function fetchMovieById(
  id: string
): Promise<FetchMovieDetailsResponse> {
  try {
    const response = await axios.get<MovieDetails>(
      `http://www.omdbapi.com/?i=${id}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    if (response.data) {
      return { movie: response.data, error: null };
    } else {
      return { movie: null, error: "No movie found" };
    }
  } catch (error) {
    console.error(error);

    let errorMessage = "An unexpected error occurred";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.Error || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { movie: null, error: errorMessage };
  }
}
