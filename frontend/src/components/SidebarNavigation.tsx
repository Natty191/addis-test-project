import styled from "@emotion/styled";
import NavList from "./NavLIst";
import { NavObject } from "../data/navigations";
import { MdMusicNote } from "react-icons/md";

const StyledSidebarNavigation = styled.div`
  margin-bottom: 2rem;
  padding: 3rem 2.4rem;

  overflow-y: scroll;
`;

const SidebarNavigation = ({ navigations }: { navigations: NavObject }) => {
  return (
    <StyledSidebarNavigation>
      {navigations.map((nav) => (
        <NavList key={nav.title} title={nav.title}>
          {nav.navigations.map((item) => (
            <NavList.Item
              key={item.text}
              href={item.href}
              title={item.text}
              icon={item.icon ? <item.icon /> : <MdMusicNote />}
            />
          ))}
        </NavList>
      ))}
    </StyledSidebarNavigation>
  );
};

export default SidebarNavigation;
