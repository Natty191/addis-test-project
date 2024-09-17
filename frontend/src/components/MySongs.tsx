import styled from "@emotion/styled";
import { Song } from "song";
import MySongCard from "./MySongCard";

const SongsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  grid-template-rows: 1fr;
  grid-row-gap: 1rem;
  /* grid-auto-rows: 0; */
  overflow: hidden;
`;

const MySongs = ({ songs }: { songs: Song[] }) => {
  return (
    <SongsGrid>
      {songs.map((song) => (
        <MySongCard song={song} />
      ))}
    </SongsGrid>
  );
};

export default MySongs;
