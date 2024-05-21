"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDebounceCallback from "./useDebounceCallback";

export default function SearchBar() {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebounceCallback((value: string | null) => {
    const query = new URLSearchParams(searchParam);
    if (value) {
      query.set("query", value);
    } else {
      query.delete("query");
    }
    replace(`${pathname}?${query.toString()}`);
  }, 500);

  return (
    <div className="items-center border-2 border-black rounded-lg p-4 ">
      <input
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParam.get("query")?.toString()}
        className="w-full border-none focus:outline-none focus:ring-0 focus:border-transparent"
        placeholder="Search"
      />
    </div>
  );
}
