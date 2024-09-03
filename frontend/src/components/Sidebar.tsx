/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import NavList from "./NavLIst";
import {
  HiAdjustmentsHorizontal,
  HiDocumentDuplicate,
  HiMiniUsers,
  HiMusicalNote,
  HiSignal,
  HiUser,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { MdMusicNote } from "react-icons/md";

const StyledSidebar = styled.aside`
  /* background-color: hsl(0, 0%, 15.686274509803921%); */
  /* color: rgb(170, 170, 170); */
  /* padding-top: 3rem; */

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: calc(100vh - 5.7rem);

  position: relative;
`;

const Navigation = styled.div`
  padding: 3rem 2.4rem;

  overflow-y: scroll;
`;

const Playlist = styled.div`
  padding: 2.4rem;

  a {
    display: flex;
    align-items: center;

    svg {
      margin-right: 2rem;
      scale: 2;
    }
  }
`;

const Sidebar = () => {
  return (
    <StyledSidebar sx={{ color: "lightgrey" }}>
      <Navigation>
        <NavList title="Main">
          <NavList.Item
            href="#"
            title="Browse"
            icon={<HiDocumentDuplicate />}
          />
          <NavList.Item href="#" title="Active" icon={<HiMiniUsers />} />
          <NavList.Item href="#" title="Radio" icon={<HiSignal />} />
        </NavList>
        <NavList title="Your Music">
          <NavList.Item
            href="#"
            title="Songs"
            icon={<HiAdjustmentsHorizontal />}
          />
          <NavList.Item href="#" title="Albums" icon={<HiMusicalNote />} />
          <NavList.Item href="#" title="Artists" icon={<HiUser />} />
        </NavList>
        <NavList title="Playlists">
          <NavList.Item href="#" title="Playlists" icon={<MdMusicNote />} />
          <NavList.Item href="#" title="Doo Wop" icon={<MdMusicNote />} />
          <NavList.Item href="#" title="Pop Classics" icon={<MdMusicNote />} />
          <NavList.Item href="#" title="Love Songs" icon={<MdMusicNote />} />
          <NavList.Item href="#" title="Hipster" icon={<MdMusicNote />} />
          <NavList.Item
            href="#"
            title="New Music Friday"
            icon={<MdMusicNote />}
          />
          <NavList.Item href="#" title="Tecno Poppers" icon={<MdMusicNote />} />
          <NavList.Item
            href="#"
            title="Summer Smoothers"
            icon={<MdMusicNote />}
          />
        </NavList>
      </Navigation>

      <Playlist
        sx={(props) => ({
          background: "background",
          borderTop: `2px solid ${props.colors?.grey}`,
          borderBottom: `2px solid ${props.colors?.grey}`,
          color: "lightgrey",

          "&:hover": {
            background: "grey",
            a: {
              color: "text",
            },
          },
        })}
      >
        <a href="#">
          <HiOutlinePlusCircle />
          Add Playlist
        </a>
      </Playlist>
    </StyledSidebar>
  );
};

export default Sidebar;
