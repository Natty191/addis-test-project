/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { Song } from "song";
import CardLink from "./CardLink";
import DeleteButton from "./DeleteButton";
import React from "react";
import EditButton from "./EditButton";

const SongCard = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  position: relative;
  font-size: 1.5rem;

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

const MySongCard = ({
  song,
  ...rest
}: { song: Song } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <SongCard
      {...rest}
      sx={{
        background: "grey",
        ":hover": {
          background: "lightgrey",
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
      <div
        sx={{
          //   position: "absolute",
          marginLeft: "auto",
          display: "flex",
          gap: "1rem",
          right: "2rem",
        }}
      >
        <EditButton song={song} />
        <DeleteButton songId={song._id} />
      </div>
    </SongCard>
  );
};

export default MySongCard;
