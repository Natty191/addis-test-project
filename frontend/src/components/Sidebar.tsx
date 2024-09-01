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
  /* background-color: rgb(40, 40, 40); */
  background-color: rgb(24, 24, 24);
  color: rgb(170, 170, 170);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: calc(100vh - 5.7rem);

  position: relative;
`;

const Navigation = styled.div`
  padding: 1rem 2.4rem;

  overflow-y: scroll;

  /* border-bottom: 1px solid rgb(24, 24, 24); */
`;

const Playlist = styled.div`
  padding: 2.4rem;
  background: rgb(40, 40, 40);
  border-top: 1px solid rgb(24, 24, 24);
  border-bottom: 1px solid rgb(24, 24, 24);

  &:hover {
    background: rgb(70, 70, 70);
    a {
      color: white;
    }
  }

  a {
    color: rgb(130, 130, 130);

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
    <StyledSidebar>
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

      <Playlist>
        <a href="#">
          <HiOutlinePlusCircle />
          Add Playlist
        </a>
      </Playlist>
    </StyledSidebar>
  );
};

export default Sidebar;
