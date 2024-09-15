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

const StyledSongCard = styled.div`
  position: relative;
`;

const FavoriteButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
  cursor: pointer;
`;

const SongCard = ({ song }: { song: Song }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const isFavorite = user ? user.favoriteSongs.includes(song._id) : false;
  const dispatch = useDispatch();

  function addRemoveFavorite() {
    if (!user) {
      dispatch(openAuthModal());
    } else {
      if (!isFavorite) {
        dispatch(addFavoriteSongRequest(song._id));
      } else {
        dispatch(removeFavoriteSongRequest(song._id));
      }
    }
  }

  return (
    <StyledSongCard>
      <Card
        title={song.title}
        subTitle={song.artist}
        imageUrl={song.coverUrls?.[0] ?? ""}
        defaultImageUrl="/song.jpg"
        subTitleLink={song.artist}
      />
      <FavoriteButton onClick={addRemoveFavorite} sx={{ color: "primary" }}>
        {user && user.favoriteSongs.includes(song._id) ? (
          <HiHeart size={30} />
        ) : (
          <HiOutlineHeart size={30} />
        )}
      </FavoriteButton>
    </StyledSongCard>
  );
};

export default SongCard;
