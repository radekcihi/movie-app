"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useDebounceCallback from "./useDebounceCallback";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentPage = parseInt(searchParam.get("page") || "1", 10);

  const handleChange = useDebounceCallback((value: string | null) => {
    const query = new URLSearchParams(searchParam);
    if (value) {
      query.set("page", value);
    } else {
      query.delete("page");
    }
    replace(`${pathname}?${query.toString()}`);
  }, 500);

  return (
    <div className="mt-4 flex justify-center space-x-4">
      <button
        onClick={() => handleChange((currentPage - 1).toString())}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded bg-gray-200 disabled:bg-gray-100"
      >
        Previous
      </button>
      <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => handleChange((currentPage + 1).toString())}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded bg-gray-200 disabled:bg-gray-100"
      >
        Next
      </button>
    </div>
  );
}
