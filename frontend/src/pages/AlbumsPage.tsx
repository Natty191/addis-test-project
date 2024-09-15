import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import {
  getFavoritesRequest,
  getPopularAlbumsRequest,
} from "../redux/songSlice";
import Spinner from "../components/Spinner";
import styled from "@emotion/styled";
import AlbumCard from "../components/AlbumCard";
import TitledSection from "../components/TitledSection";
import { Link } from "react-router-dom";

const SongsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-template-rows: 1fr;
  grid-auto-rows: 0;
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

  if (loadingPopularAlbums) return <Spinner />;
  return (
    <TitledSection title="All Albums">
      <SongsGrid>
        {popularAlbums.map((album) => (
          <Link to={`/songs?album=${album.album}`}>
            <AlbumCard album={album} />
          </Link>
        ))}
      </SongsGrid>
    </TitledSection>
  );
};

export default AlbumsPage;
