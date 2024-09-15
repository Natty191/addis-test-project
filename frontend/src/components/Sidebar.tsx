/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import SidebarNavigation from "./SidebarNavigation";
import { navigations } from "../data/navigations";
import { useDispatch } from "react-redux";
import { openAddModal } from "../redux/songSlice";
import React from "react";

const StyledSidebar = styled.aside`
  font-size: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;

  height: calc(100vh - 5.7rem);
`;

const Playlist = styled.button`
  padding: 2.4rem;

  display: flex;
  align-items: center;
  font-weight: 900;

  svg {
    margin-right: 2rem;
    scale: 2;
  }
`;

const Sidebar = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
  const dispatch = useDispatch();

  return (
    <StyledSidebar
      sx={{
        color: "lightergrey",
        background: "background",

        position: ["absolute", isDrawerOpen ? "static" : "absolute", "static"],
        bottom: 0,
        right: [isDrawerOpen ? "calc(65% - 9rem)" : "initial", "initial"],
        left: isDrawerOpen ? "0" : "-100%",
      }}
    >
      <SidebarNavigation navigations={navigations} />
      <Playlist
        onClick={() => dispatch(openAddModal())}
        sx={(props) => ({
          background: "background",
          borderTop: `2px solid ${props.colors?.grey}`,
          borderBottom: `2px solid ${props.colors?.grey}`,
          color: "primary",
          "&:hover": {
            background: "primary",
            color: "text",
          },
        })}
      >
        <HiOutlinePlusCircle />
        Add New Song
      </Playlist>
    </StyledSidebar>
  );
};

export default Sidebar;
