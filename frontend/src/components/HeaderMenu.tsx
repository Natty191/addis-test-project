import styled from "@emotion/styled";
import UserAvatar from "./UserAvatar";
import Menus from "./Menus";
import { HiArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2";
import { useColorMode } from "theme-ui";

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
    <StyledHeaderMenu className="user">
      {/* <div className="user__notifications">
              <i className="ion-android-notifications"></i>
            </div>
    
            <div className="user__inbox">
              <i className="ion-archive"></i>
            </div> */}

      <UserAvatar />

      {/* <div className="user__actions">
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            <i className="ion-chevron-down"></i>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenu1"
          >
            <li>
              <a href="#">Private Session</a>
            </li>
            <li>
              <a href="#">Account</a>
            </li>
            <li>
              <a href="#">Settings</a>
            </li>
            <li>
              <a href="#">Log Out</a>
            </li>
          </ul>
        </div>
      </div> */}

      <Menus>
        <Menus.Toggle id="drop-down" />
        <Menus.List id="drop-down">
          <Menus.Button icon={<HiOutlineUser />}>Account</Menus.Button>
          <Menus.Button icon={<HiArrowRightOnRectangle />}>
            Log out
          </Menus.Button>
        </Menus.List>
      </Menus>
    </StyledHeaderMenu>
  );
};

export default HeaderMunu;
