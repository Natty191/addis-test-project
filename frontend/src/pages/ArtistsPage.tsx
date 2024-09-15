import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { getPopularArtistsRequest } from "../redux/songSlice";
import Spinner from "../components/Spinner";
import styled from "@emotion/styled";
import ArtistCard from "../components/ArtistCard";
import TitledSection from "../components/TitledSection";
import { Link } from "react-router-dom";

const SongsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-template-rows: 1fr;
  grid-auto-rows: 0;
  overflow: hidden;
`;

const ArtistsPage = () => {
  const { loadingPopularArtists, popularArtists } = useSelector(
    (state: RootState) => state.songs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularArtistsRequest({ limit: 20, page: 1 }));
  }, [dispatch]);

  if (loadingPopularArtists) return <Spinner />;
  return (
    <TitledSection title="All Artists">
      <SongsGrid>
        {popularArtists.map((artist) => (
          <Link to={`/songs?artist=${artist.artist}`}>
            <ArtistCard artist={artist} />
          </Link>
        ))}
      </SongsGrid>
    </TitledSection>
  );
};

export default ArtistsPage;
