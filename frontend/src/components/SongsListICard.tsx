/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { Song } from "song";
import CardLink from "./CardLink";
import DeleteButton from "./DeleteButton";

const SongCard = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;

  :hover button {
    visibility: visible;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;

  a {
    :hover {
      text-decoration: underline;
    }
  }
`;

const Image = styled.img`
  max-width: 3rem;
  aspect-ratio: 1.05;
  border-radius: 2px;
`;

const SongsListCard = ({ song }: { song: Song }) => {
  return (
    <SongCard
      sx={{
        background: "darkgrey",
        ":hover": {
          background: "grey",
        },
      }}
    >
      <Image src="/song.jpg" alt="" />
      <Links sx={{ color: "lightestgrey" }}>
        <CardLink to="#">{song.title}</CardLink>
        <CardLink
          to="#"
          sx={{
            color: "lightergrey",
          }}
        >
          {song.artist}
        </CardLink>
      </Links>
      <DeleteButton song={song} />
    </SongCard>
  );
};

export default SongsListCard;
