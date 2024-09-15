import { useDispatch, useSelector } from "react-redux";
import MySongs from "../components/MySongs";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { getMySongsRequest } from "../redux/songSlice";
import Spinner from "../components/Spinner";

const MySongsPage = () => {
  const { mySongs, loading } = useSelector((state: RootState) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMySongsRequest());
  }, [dispatch]);

  if (loading)
    return (
      <div style={{ height: "calc(100vh - 10rem)" }}>
        <Spinner />
      </div>
    );
  if (mySongs.length === 0)
    return <div style={{ height: "calc(100vh - 10rem)" }}>No songs found</div>;
  return <MySongs songs={mySongs} />;
};

export default MySongsPage;
