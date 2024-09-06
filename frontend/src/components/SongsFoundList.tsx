/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { Song } from "song";
import SongsListCard from "./SongsListICard";

const StyledSongsFoundList = styled.div`
  display: flex;
  flex-direction: column;
  min-width: max-content;
  > * {
    height: 100%;
  }
`;

const SongsFoundList = ({ songs }: { songs: Song[] }) => {
  return (
    <StyledSongsFoundList>
      {songs.slice(0, 4).map((song) => (
        <SongsListCard key={song._id} song={song} />
      ))}
    </StyledSongsFoundList>
  );
};

export default SongsFoundList;
