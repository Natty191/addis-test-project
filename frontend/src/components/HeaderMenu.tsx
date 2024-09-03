import styled from "@emotion/styled";
import UserAvatar from "./UserAvatar";
import Menus from "./Menus";
import {
  HiArrowRightOnRectangle,
  HiOutlineSun,
  HiOutlineUser,
  HiSun,
} from "react-icons/hi2";
import { useColorMode } from "theme-ui";
import { HiColorSwatch } from "react-icons/hi";

const StyledHeaderMenu = styled.div`
  width: 20rem;
  margin-left: auto;

  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`;

const HeaderMunu = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <StyledHeaderMenu>
      <UserAvatar />
      <Menus>
        <Menus.Toggle id="drop-down" />
        <Menus.List id="drop-down">
          <Menus.Button
            onClick={() =>
              setColorMode((mode) => (mode !== "light" ? "light" : "default"))
            }
            icon={<HiSun />}
          >
            {colorMode !== "light" ? "Light " : "Dark "}Mode
          </Menus.Button>
          <Menus.Button icon={<HiArrowRightOnRectangle />}>
            Log out
          </Menus.Button>
        </Menus.List>
      </Menus>
    </StyledHeaderMenu>
  );
};

export default HeaderMunu;
