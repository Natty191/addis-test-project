import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchSongsRequest } from "../redux/songSlice";
import { useEffect, useMemo } from "react";

export const useSongs = () => {
  const { songs, loading, error } = useSelector(
    (state: RootState) => state.songs
  );
  const dispatch = useDispatch();
  const { filter = "all" } = useParams();
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";
  const query: { filter: string; value: string } = useMemo(
    () => ({ filter, value: searchParams.get("query") || "" }),
    [filter, searchParams]
  );

  useEffect(() => {
    dispatch(fetchSongsRequest({ filter, sortBy, query }));
  }, [filter, sortBy, query, dispatch]);

  return { songs, loading, error };
};
