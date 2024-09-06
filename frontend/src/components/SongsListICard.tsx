/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { Song } from "song";
import CardLink from "./CardLink";

const SongCard = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
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
        ":hover": {
          background: "grey",
        },
      }}
    >
      <Image
        src="https://assets.audiomack.com/abusha-mesganew/5b54c92aba0c18661df39a814c76d723b612c42eaa642b154f1e16e5fc21d0c6.jpeg?width=1000&height=1000&max=true"
        alt=""
      />
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
    </SongCard>
  );
};

export default SongsListCard;
