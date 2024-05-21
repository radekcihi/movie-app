import { Suspense } from "react";

import MovieList from "@/components/MovieList";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl mb-4">Movie App</h1>
      <SearchBar />

      <div className="w-full p-4">
        <Suspense key={query} fallback={<div>Loading...</div>}>
          <MovieList query={query} />
        </Suspense>
      </div>
    </div>
  );
}
