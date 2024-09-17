import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { getFavoritesRequest } from "../redux/songSlice";
import SongCard from "../components/SongCard";
import Spinner from "../components/Spinner";
import styled from "@emotion/styled";
import LoadingCard from "../components/LoadingCard";

const SongsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-template-rows: 1fr;
  overflow: hidden;
`;

const FavoritesPage = () => {
  const { loadingFavorites, favorites } = useSelector(
    (state: RootState) => state.songs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavoritesRequest());
  }, [dispatch]);

  return (
    <SongsGrid>
      {loadingFavorites
        ? Array.from({ length: 15 }).map(() => <LoadingCard />)
        : favorites.map((song) => <SongCard song={song} />)}
    </SongsGrid>
  );
};

export default FavoritesPage;
