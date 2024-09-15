/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { Song } from "song";
import CardLink from "./CardLink";
import DeleteButton from "./DeleteButton";
import React from "react";

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

const SongsListCard = ({
  song,
  ...rest
}: { song: Song } & React.HTMLAttributes<HTMLDivElement>) => {
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
        src={song.coverUrls?.[0]}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          (e.target as HTMLImageElement).src = "/song.jpg";
        }}
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
      <DeleteButton songId={song._id} />
    </SongCard>
  );
};

export default SongsListCard;
