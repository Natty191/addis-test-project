/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import UserAvatar from "./UserAvatar";
import Menus from "./Menus";
import { HiArrowRightOnRectangle, HiSun } from "react-icons/hi2";
import { useColorMode } from "theme-ui";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest, openAuthModal } from "../redux/authSlice";
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
      {isAuthenticated ? (
        <UserAvatar />
      ) : (
        <div
          sx={{
            display: "flex",
            // gap: ".5rem",
          }}
        >
          <Button onClick={() => dispatch(openAuthModal("signup"))}>
            Sign up
          </Button>
          <Button
            onClick={() => dispatch(openAuthModal("login"))}
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
