/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import UserAvatar from "./UserAvatar";
import Menus from "./Menus";
import { HiArrowRightOnRectangle, HiSun, HiUserCircle } from "react-icons/hi2";
import { useColorMode } from "theme-ui";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest, switchAuth } from "../redux/authSlice";
import { RootState } from "../redux/store";
import Button from "./Button";

const StyledHeaderMenu = styled.div`
  margin-left: auto;

  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

const HeaderMunu = () => {
  const [colorMode, setColorMode] = useColorMode();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  function handleLogout() {
    dispatch(logoutRequest());
  }

  return (
    <StyledHeaderMenu>
      {isAuthenticated && <UserAvatar />}
      {!isAuthenticated && (
        <div
          sx={{
            display: ["none", "flex"],
            // gap: ".5rem",
          }}
        >
          <Button size="medium" onClick={() => dispatch(switchAuth("signup"))}>
            Sign up
          </Button>
          <Button
            size="medium"
            onClick={() => dispatch(switchAuth("login"))}
            variation="link"
          >
            Login
          </Button>
        </div>
      )}

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
          {!isAuthenticated && (
            <Menus.Button
              onClick={() => dispatch(switchAuth("login"))}
              icon={<HiUserCircle />}
            >
              Log in
            </Menus.Button>
          )}
          {isAuthenticated && (
            <Menus.Button
              onClick={handleLogout}
              icon={<HiArrowRightOnRectangle />}
            >
              Log out
            </Menus.Button>
          )}
        </Menus.List>
      </Menus>
    </StyledHeaderMenu>
  );
};

export default HeaderMunu;
