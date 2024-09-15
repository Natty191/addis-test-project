import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { getPopularSongsRequest } from "../redux/songSlice";
import Spinner from "../components/Spinner";
import styled from "@emotion/styled";
import SongCard from "../components/SongCard";
import TitledSection from "../components/TitledSection";
import { useParams, useSearchParams } from "react-router-dom";

const SongsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-template-rows: 1fr;
  grid-auto-rows: 0;
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

  useEffect(() => {
    dispatch(getPopularSongsRequest({ artist, album, limit: 20, page: 1 }));
  }, [dispatch]);

  if (loadingPopularSongs) return <Spinner />;
  return (
    <TitledSection
      title={`All Songs ${artist ? `  -  ${artist}` : ""} ${
        album ? `  -  ${album}` : ""
      }`}
    >
      <SongsGrid>
        {popularSongs.map((song) => (
          <SongCard song={song} />
        ))}
      </SongsGrid>
    </TitledSection>
  );
};

export default SongsPage;
