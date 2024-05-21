"use client";
import { useRouter } from "next/navigation";
import { fetchMovieById } from "@/api/movies";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Favorites from "@/components/Favorites";

export default function MovieDetails({
  params: { movieId },
}: {
  params: {
    movieId: string;
  };
}) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => fetchMovieById(movieId),
    queryKey: [movieId],
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError || !data?.movie) return <p>Error fetching data</p>;

  const { movie: movieDetails } = data;
  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 p-2 border rounded hover:bg-gray-200 transition"
      >
        Back
      </button>
      <Favorites movieId={movieId} />

      <h1 className="text-2xl font-bold">{movieDetails.Title}</h1>
      <p className="text-lg">{movieDetails.Year}</p>
      <p className="my-4">{movieDetails.Plot}</p>
      {movieDetails.Poster && (
        <Image
          src={movieDetails.Poster}
          alt={movieDetails.Title}
          width={300}
          height={400}
          className="w-full max-w-md mx-auto"
        />
      )}
    </div>
  );
}
