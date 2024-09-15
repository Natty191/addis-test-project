import styled from "@emotion/styled";
import SongCard from "./SongCard";
import { Song } from "song";
import SongsFoundList from "./SongsFoundList";
import SongsListCard from "./SongsListICard";
import MySongCard from "./MySongCard";

const SongsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  grid-template-rows: 1fr;
  gap: 1rem;
  /* grid-auto-rows: 0; */
  overflow: hidden;
`;

const Flex = styled.div`
  display: flex;
`;

const MySongs = ({ songs }: { songs: Song[] }) => {
  return (
    <SongsGrid>
      {songs.map((song) => (
        <MySongCard song={song} />
      ))}
    </SongsGrid>

    // <SongsGrid>
    //   {songs.map((song) => (
    //     <SongCard song={song} />
    //   ))}
    // </SongsGrid>
  );
};

export default MySongs;
