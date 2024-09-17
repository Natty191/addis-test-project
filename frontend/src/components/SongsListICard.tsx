/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { Song } from "song";
import CardLink from "./CardLink";
import DeleteButton from "./DeleteButton";
import React from "react";
import FavoriteButton from "./FavoriteButton";

const SongCard = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  position: relative;

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

const SongsListCard = ({
  song,
  withFavButton,
  ...rest
}: {
  song: Song;
  withFavButton?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <SongCard
      {...rest}
      sx={{
        background: "darkgrey",
        ":hover": {
          background: "grey",
        },
      }}
    >
      {/* <Image src={song.coverUrls[2] ?? "/song.jpg"} alt="" /> */}
      <Image
        src={song.coverUrls?.[2]}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          (e.target as HTMLImageElement).src = "/song.jpg";
        }}
      />
      <Links sx={{ color: "lightestgrey" }}>
        <CardLink sx={{ ":hover": { textDecoration: "none" } }} to="#">
          {song.title}
        </CardLink>
        <CardLink
          to={withFavButton ? `/songs?artist=${song.artist}` : "#"}
          sx={{
            color: "lightergrey",
          }}
        >
          {song.artist}
        </CardLink>
      </Links>
      {withFavButton && (
        <FavoriteButton
          sx={{ position: "absolute", right: "1.5rem" }}
          size={20}
          songId={song._id}
        />
      )}
    </SongCard>
  );
};

export default SongsListCard;
