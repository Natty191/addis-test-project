/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { Song } from "song";
import SongsListCard from "./SongsListICard";
import { Theme, ThemeUIStyleObject } from "theme-ui";

const StyledSongsFoundList = styled.div`
  display: flex;
  flex-direction: column;
  min-width: max-content;
  > * {
    height: 100%;
  }
`;

const SongsFoundList = ({
  songs,
  ...rest
}: {
  songs: Song[];
  sx?: ThemeUIStyleObject<Theme>;
}) => {
  return (
    <StyledSongsFoundList {...rest}>
      {songs.slice(0, 4).map((song) => (
        <SongsListCard withFavButton key={song._id} song={song} />
      ))}
    </StyledSongsFoundList>
  );
};

export default SongsFoundList;
