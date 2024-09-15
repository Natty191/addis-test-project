/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteSongRequest,
  openAuthModal,
  removeFavoriteSongRequest,
} from "../redux/authSlice";
import { RootState } from "../redux/store";
import { Theme, ThemeUIStyleObject } from "theme-ui";

const StyledFavoriteButton = styled.div`
  /* position: absolute; */
  padding: 0.5rem;
  cursor: pointer;
`;

const FavoriteButton = ({
  songId,
  size = 30,
  ...rest
}: {
  size?: number;
  songId: string;
  sx?: ThemeUIStyleObject<Theme>;
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const isFavorite = user ? user.favoriteSongs.includes(songId) : false;
  const dispatch = useDispatch();

  function addRemoveFavorite() {
    if (!user) {
      dispatch(openAuthModal());
    } else {
      if (!isFavorite) {
        dispatch(addFavoriteSongRequest(songId));
      } else {
        dispatch(removeFavoriteSongRequest(songId));
      }
    }
  }
  return (
    <StyledFavoriteButton
      {...rest}
      onClick={addRemoveFavorite}
      sx={{ color: "primary" }}
    >
      {user && user.favoriteSongs.includes(songId) ? (
        <HiHeart size={size} />
      ) : (
        <HiOutlineHeart size={size} />
      )}
    </StyledFavoriteButton>
  );
};

export default FavoriteButton;
