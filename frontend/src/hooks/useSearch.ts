import { useDeferredValue, useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

export function useSearch(
  initial: string
): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  React.RefObject<HTMLInputElement>
] {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(
    () => searchParams.get("query") ?? initial
  );
  // const defferedQuery = useDeferredValue(query);
  const location = useLocation();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (location.pathname.startsWith("/search")) return;
    setQuery("");
    ref.current?.blur();
  }, [location.pathname]);

  const debouncedSetQuery = debounce((searchQuery: string) => {
    if (query === "") {
      searchParams.delete("query");
    } else {
      searchParams.set("query", searchQuery);
    }
    setSearchParams(searchParams, { replace: true });
  }, 300);

  useEffect(() => {
    debouncedSetQuery(query);
  }, [query]);

  return [query, setQuery, ref];
}
