/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import SongCard from "./SongCard";
import TitledSection from "./TitledSection";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularAlbumsRequest,
  getPopularArtistsRequest,
  getPopularGenresRequest,
  getPopularSongsRequest,
} from "../redux/songSlice";
import ArtistCard from "./ArtistCard";
import GenreCard from "./GenreCard";
import AlbumCard from "./AlbumCard";
import LoadingCard from "./LoadingCard";

const StyledSongs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 13rem;
`;

const SongsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-template-rows: 1fr;
  grid-auto-rows: 0;
  overflow: hidden;
`;

const Songs = () => {
  const {
    popularSongs,
    popularArtists,
    popularAlbums,
    popularGenres,
    loadingPopularSongs,
    loadingPopularArtists,
    loadingPopularAlbums,
    loadingPopularGenres,
  } = useSelector((state: RootState) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularSongsRequest({ limit: 10, page: 1 }));
    dispatch(getPopularArtistsRequest({ limit: 10, page: 1 }));
    dispatch(getPopularAlbumsRequest({ limit: 10, page: 1 }));
    dispatch(getPopularGenresRequest({ limit: 10, page: 1 }));
  }, [dispatch]);

  return (
    <StyledSongs sx={{ color: "lightestgrey" }}>
      {popularArtists.length !== 0 && (
        <TitledSection title="Popular Artists">
          <SongsGrid>
            {loadingPopularArtists
              ? Array.from({ length: 15 }).map(() => (
                  <LoadingCard type="circular" />
                ))
              : popularArtists.map((artist) => <ArtistCard artist={artist} />)}
          </SongsGrid>
        </TitledSection>
      )}
      {popularSongs.length !== 0 && (
        <TitledSection title="Popular Songs">
          <SongsGrid>
            {loadingPopularSongs
              ? Array.from({ length: 15 }).map(() => <LoadingCard />)
              : popularSongs.map((song) => (
                  <SongCard key={song._id} song={song} />
                ))}
          </SongsGrid>
        </TitledSection>
      )}
      {popularGenres.length !== 0 && (
        <TitledSection title="Popular Genres">
          <SongsGrid>
            {loadingPopularGenres
              ? Array.from({ length: 15 }).map(() => <LoadingCard />)
              : popularGenres.map((genre) => (
                  <GenreCard key={genre.genre} genre={genre} />
                ))}
          </SongsGrid>
        </TitledSection>
      )}
      {popularAlbums.length !== 0 && (
        <TitledSection title="Popular Albums">
          <SongsGrid>
            {loadingPopularAlbums
              ? Array.from({ length: 15 }).map(() => <LoadingCard />)
              : popularAlbums.map((album) => (
                  <AlbumCard key={album.album} album={album} />
                ))}
          </SongsGrid>
        </TitledSection>
      )}
    </StyledSongs>
  );
};

export default Songs;
