import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { getPopularSongsRequest } from "../redux/songSlice";
import styled from "@emotion/styled";
import SongCard from "../components/SongCard";
import TitledSection from "../components/TitledSection";
import { useSearchParams } from "react-router-dom";
import LoadingCard from "../components/LoadingCard";

const SongsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-template-rows: 1fr;
  overflow: hidden;
`;

const SongsPage = () => {
  const { loadingPopularSongs, popularSongs } = useSelector(
    (state: RootState) => state.songs
  );
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const artist = searchParams.get("artist") as string;
  const album = searchParams.get("album") as string;
  const genre = searchParams.get("genre") as string;

  useEffect(() => {
    dispatch(
      getPopularSongsRequest({ artist, album, genre, limit: 50, page: 1 })
    );
  }, [dispatch, artist, album]);

  return (
    <TitledSection
      title={`All Songs ${artist ? `  -  ${artist}` : ""} ${
        album ? `  -  ${album}` : ""
      }`}
    >
      <SongsGrid>
        {loadingPopularSongs
          ? Array.from({ length: 15 }).map(() => <LoadingCard />)
          : popularSongs.map((song) => <SongCard song={song} />)}
      </SongsGrid>
    </TitledSection>
  );
};

export default SongsPage;
