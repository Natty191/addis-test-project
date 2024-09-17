import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { getPopularArtistsRequest } from "../redux/songSlice";
import styled from "@emotion/styled";
import ArtistCard from "../components/ArtistCard";
import TitledSection from "../components/TitledSection";
import { Link } from "react-router-dom";
import LoadingCard from "../components/LoadingCard";

const SongsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-template-rows: 1fr;
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

  return (
    <TitledSection title="All Artists">
      <SongsGrid>
        {loadingPopularArtists
          ? Array.from({ length: 15 }).map(() => <LoadingCard />)
          : popularArtists.map((artist) => (
              <Link to={`/songs?artist=${artist.artist}`}>
                <ArtistCard artist={artist} />
              </Link>
            ))}
      </SongsGrid>
    </TitledSection>
  );
};

export default ArtistsPage;
