/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { useSongs } from "../hooks/useSongs";
import SongCard from "./SongCard";
import TitledSection from "./TitledSection";
import { Song } from "song";

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

const removeDuplicate = (array: Song[], property: string) => [
  ...new Map(
    array.map((item) => [item[property as keyof Song].toString(), item])
  ).values(),
];

const Songs = () => {
  const { songs, loading, error } = useSongs();

  const artists = removeDuplicate(songs.all, "artist");
  const albums = removeDuplicate(songs.all, "album");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <StyledSongs sx={{ color: "lightestgrey" }}>
      <TitledSection title="Artists">
        <SongsGrid>
          {artists.map((song) => (
            <SongCard
              title={song.artist}
              type="circular"
              key={song._id}
              song={song}
            />
          ))}
        </SongsGrid>
      </TitledSection>
      <TitledSection title="Songs">
        <SongsGrid>
          {songs.all.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </SongsGrid>
      </TitledSection>
    </StyledSongs>
  );
};

export default Songs;
