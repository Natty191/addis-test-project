import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { getPopularAlbumsRequest } from "../redux/songSlice";
import styled from "@emotion/styled";
import AlbumCard from "../components/AlbumCard";
import TitledSection from "../components/TitledSection";
import { Link } from "react-router-dom";
import LoadingCard from "../components/LoadingCard";

const SongsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-template-rows: 1fr;
  overflow: hidden;
`;

const AlbumsPage = () => {
  const { loadingPopularAlbums, popularAlbums } = useSelector(
    (state: RootState) => state.songs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularAlbumsRequest({ limit: 20, page: 1 }));
  }, [dispatch]);

  return (
    <TitledSection title="All Albums">
      <SongsGrid>
        {loadingPopularAlbums
          ? Array.from({ length: 15 }).map(() => <LoadingCard />)
          : popularAlbums.map((album) => (
              <Link to={`/songs?album=${album.album}`}>
                <AlbumCard album={album} />
              </Link>
            ))}
      </SongsGrid>
    </TitledSection>
  );
};

export default AlbumsPage;
