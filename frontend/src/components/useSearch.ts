import { useDeferredValue, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { fetchSongsRequest } from "../redux/songSlice";

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
  const dispatch = useDispatch();
  const location = useLocation();
  const ref = useRef<HTMLInputElement>(null);

  // const filterBy = searchParams.get("filterBy") || "";
  const { filter } = useParams();
  const sortBy = searchParams.get("sortBy") || "";

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

    dispatch(
      fetchSongsRequest({ filter, sortBy, query: { filter, value: query } })
    );

    // if (defferedQuery.length < 1) return;
    // navigate("/add-song");
  }, [defferedQuery]);

  return [query, setQuery, ref];
}
