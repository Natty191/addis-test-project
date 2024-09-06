import { useDeferredValue, useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

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
  const defferedQuery = useDeferredValue(query);
  const location = useLocation();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (location.pathname.startsWith("/search")) return;
    setQuery("");
    ref.current?.blur();
  }, [location.pathname]);

  useEffect(() => {
    if (defferedQuery === "") {
      searchParams.delete("query");
    } else {
      searchParams.set("query", defferedQuery);
    }
    setSearchParams(searchParams, { replace: true });
  }, [defferedQuery]);

  return [query, setQuery, ref];
}
