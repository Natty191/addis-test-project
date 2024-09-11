/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import SidebarNavigation from "./SidebarNavigation";
import { navigations } from "../data/navigations";

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: calc(100vh - 5.7rem);
`;

const Playlist = styled.div`
  padding: 2.4rem;

  button {
    display: flex;
    align-items: center;

    svg {
      margin-right: 2rem;
      scale: 2;
    }
  }
`;

const Sidebar = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
  return (
    <StyledSidebar
      sx={{
        color: "lightergrey",
        background: "background",

        position: ["absolute", isDrawerOpen ? "static" : "absolute", "static"],
        bottom: 0,
        right: [isDrawerOpen ? "30%" : "initial", "initial"],
        left: isDrawerOpen ? "0" : "-100%",
      }}
    >
      <SidebarNavigation navigations={navigations} />
      <Playlist
        sx={(props) => ({
          background: "background",
          borderTop: `2px solid ${props.colors?.grey}`,
          borderBottom: `2px solid ${props.colors?.grey}`,
          color: "lightergrey",
          "&:hover": {
            background: "grey",
            a: {
              color: "text",
            },
          },
        })}
      >
        {/* <button>
          <HiOutlinePlusCircle />
          Add Playlist
        </button> */}
      </Playlist>
    </StyledSidebar>
  );
};

export default Sidebar;
