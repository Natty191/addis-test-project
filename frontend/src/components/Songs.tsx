/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { useSongs } from "../hooks/useSongs";
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
  }, []);

  if (
    loadingPopularArtists ||
    loadingPopularSongs ||
    loadingPopularAlbums ||
    loadingPopularGenres
  ) {
    return <p>Loading...</p>;
  }

  return (
    <StyledSongs sx={{ color: "lightestgrey" }}>
      <TitledSection title="Popular Artists">
        <SongsGrid>
          {popularArtists.map((artist) => (
            <ArtistCard artist={artist} />
          ))}
        </SongsGrid>
      </TitledSection>
      <TitledSection title="Popular Songs">
        <SongsGrid>
          {popularSongs.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </SongsGrid>
      </TitledSection>
      <TitledSection title="Popular Genres">
        <SongsGrid>
          {popularGenres.map((genre) => (
            <GenreCard key={genre.genre} genre={genre} />
          ))}
        </SongsGrid>
      </TitledSection>
      <TitledSection title="Popular Albums">
        <SongsGrid>
          {popularAlbums.map((album) => (
            <AlbumCard key={album.album} album={album} />
          ))}
        </SongsGrid>
      </TitledSection>
    </StyledSongs>
  );
};

export default Songs;
