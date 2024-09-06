/** @jsxImportSource theme-ui */
import { Song } from "song";
import styled from "@emotion/styled";
import CardLink from "./CardLink";

const Card = styled.div`
  padding: 1.4rem;
  border-radius: 0.6rem;
  overflow: hidden;
  transition: background-color 0.2s linear, transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  cursor: pointer;

  img {
    width: 100%;
    aspect-ratio: 1.1;
    object-fit: cover;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    width: min-content;
    font-size: 3;
    font-weight: 300;
    font-family: Poppins;
    color: text;
    white-space: nowrap; // Ensure title doesn't wrap
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
`;

const SongCard = ({ song }: { song: Song }) => {
  return (
    <Card
      sx={{
        "&:hover": {
          bg: "grey",
          boxShadow: "medium",
        },
      }}
    >
      <img
        src="https://assets.audiomack.com/abusha-mesganew/5b54c92aba0c18661df39a814c76d723b612c42eaa642b154f1e16e5fc21d0c6.jpeg?width=1000&height=1000&max=true"
        alt={song.title}
        sx={{}}
      />

      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          letterSpacing: ".12rem",
        }}
      >
        <h3>{song.title}</h3>
        <CardLink
          to="#"
          sx={{
            color: "lightergrey",
            fontSize: 0,
            width: "min-content",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {song.artist}
        </CardLink>
      </div>
    </Card>
  );
};

export default SongCard;
