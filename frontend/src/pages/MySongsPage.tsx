import { useDispatch, useSelector } from "react-redux";
import MySongs from "../components/MySongs";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { getMySongsRequest } from "../redux/songSlice";

const MySongsPage = () => {
  const { mySongs, loading } = useSelector((state: RootState) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMySongsRequest());
  }, []);

  if (loading) return <div>Loading...</div>;
  return <MySongs songs={mySongs} />;
};

export default MySongsPage;
