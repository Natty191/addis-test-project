/** @jsxImportSource theme-ui */
import { Song } from "song";
import Card from "./Card";
import DeleteButton from "./DeleteButton";
import styled from "@emotion/styled";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  addFavoriteSongRequest,
  openAuthModal,
  removeFavoriteSongRequest,
} from "../redux/authSlice";
import { useState } from "react";
import FavoriteButton from "./FavoriteButton";

const StyledSongCard = styled.div`
  position: relative;
`;

const SongCard = ({
  song,
  ...rest
}: { song: Song } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <StyledSongCard {...rest}>
      <Card
        title={song.title}
        subTitle={song.artist}
        imageUrl={song.coverUrls?.[1] ?? ""}
        defaultImageUrl="/song.jpg"
        subTitleLink={song.artist}
      />
      <FavoriteButton
        sx={{ position: "absolute", right: 0, top: 0 }}
        songId={song._id}
      />
    </StyledSongCard>
  );
};

export default SongCard;
