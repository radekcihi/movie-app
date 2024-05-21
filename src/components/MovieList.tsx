import { fetchMovies } from "@/api/movies";
import Image from "next/image";
import Link from "next/link";

export default async function MovieList({ query }: { query: string }) {
  const result = await fetchMovies(query);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {Array.isArray(result.movies) ? (
        result.movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/movie/${movie.imdbID}`}>
              <div className="flex flex-col items-center text-center">
                <div className="relative w-full h-64 mb-4">
                  <Image
                    src={movie.Poster !== "N/A" ? movie.Poster : "/vercel.svg"}
                    alt={movie.Title}
                    layout="fill"
                  />
                </div>

                <h1 className="text-xl font-bold mb-2">{movie.Title}</h1>
                <p className="text-md text-gray-700">{movie.Year}</p>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="p-4 flex flex-col items-center w-full">
          <h2 className="text-lg">
            {query ? "No movies found" : "Search for movies"}
          </h2>
        </div>
      )}
    </div>
  );
}
