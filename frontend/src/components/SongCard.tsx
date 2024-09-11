/** @jsxImportSource theme-ui */
import { Song } from "song";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import CardLink from "./CardLink";
import DeleteButton from "./DeleteButton";

const Card = styled.div<{ type?: string }>`
  padding: 1.4rem;
  border-radius: 0.6rem;
  overflow: hidden;
  transition: background-color 0.2s linear, transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  font-size: 1.7rem;

  cursor: pointer;

  img {
    width: 100%;
    object-fit: cover;
    margin-bottom: 1rem;

    ${(props) =>
      props.type === "circular"
        ? css`
            border-radius: 100rem;
            aspect-ratio: 1;
          `
        : css`
            border-radius: 0.5rem;
            aspect-ratio: 1.05;
          `}
  }

  h3 {
    width: min-content;
    font-size: 1em;
    font-weight: 300;
    font-family: Poppins;
    color: text;
    white-space: nowrap; // Ensure title doesn't wrap
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  :hover {
    button {
      visibility: visible;
    }
  }
`;

const SongCard = ({
  song,
  type,
  title,
  subTitle,
}: {
  song: Song;
  type?: string;
  title?: string;
  subTitle?: string;
}) => {
  return (
    <Card
      type={type}
      sx={(theme) => ({
        "&:hover": {
          background:
            type === "circular"
              ? `linear-gradient(transparent, ${theme.colors?.grey})`
              : "grey",
          boxShadow: type == "circular" ? "none" : "medium",

          position: "relative",
        },
      })}
    >
      <img
        src={`/${type === "circular" ? "artist" : type}.jpg`}
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
        <h3>{title ?? song.title}</h3>
        <CardLink
          to={
            type == "circular" || subTitle
              ? ""
              : `search/artist?query=${song.artist}`
          }
          sx={{
            color: "lightergrey",
            fontSize: 0,
            width: "min-content",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",
            "&:hover": {
              textDecoration:
                type === "circular" || subTitle ? "none" : "underline",
            },
          }}
        >
          {subTitle ?? (type === "circular" ? "Artist" : song.artist)}
        </CardLink>
      </div>
      {type === "song" && <DeleteButton song={song} />}
    </Card>
  );
};

export default SongCard;
