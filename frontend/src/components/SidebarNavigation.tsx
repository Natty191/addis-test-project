import styled from "@emotion/styled";
import NavList from "./NavLIst";
import { NavObject } from "../data/navigations";
import { MdMusicNote } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { getFavoritesRequest } from "../redux/songSlice";
import Spinner from "./Spinner";

const StyledSidebarNavigation = styled.div`
  margin-bottom: 2rem;
  padding: 3rem 2.4rem;

  overflow-y: scroll;
`;

const SidebarNavigation = ({ navigations }: { navigations: NavObject }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { favorites, loadingFavorites } = useSelector(
    (state: RootState) => state.songs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavoritesRequest());
  }, [user?.favoriteSongs, dispatch]);

  return (
    <StyledSidebarNavigation>
      {navigations.map((nav) => (
        <NavList key={nav.title} title={nav.title}>
          {nav.navigations.map((item) => (
            <NavList.Item
              key={item.text}
              to={item.href}
              title={item.text}
              icon={item.icon ? <item.icon /> : <MdMusicNote />}
            />
          ))}
        </NavList>
      ))}
      {loadingFavorites ? (
        <Spinner />
      ) : (
        <NavList title={"Favorites"}>
          {favorites?.slice(0, 7).map((item) => (
            <NavList.Item
              key={item._id}
              to={`/favorites`}
              title={item.title}
              icon={<MdMusicNote />}
            />
          ))}
        </NavList>
      )}
    </StyledSidebarNavigation>
  );
};

export default SidebarNavigation;
