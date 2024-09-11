/** @jsxImportSource theme-ui */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAuthModal, switchAuth } from "../redux/authSlice";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Signup from "./Signup";
import Login from "./Login";
import CenteredModal from "./CenteredModal";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { RootState } from "../redux/store";

const FormContainer = styled.div`
  /* padding: 4rem; */
  width: 40rem;
  height: 100vh;
  padding: 4rem;
  border-radius: 4px;
  box-shadow: 0 4px 10px 4px rgba(19, 35, 47, 0.3);
  display: flex;
  flex-direction: column;
  gap: 4rem;
  font-size: 1.1rem;
`;

const Tabs = styled.ul`
  list-style: none;
  padding: 0;
  /* margin-bottom: 4rem; */
  display: flex;
  border-radius: 10rem;
  overflow: hidden;
  /* width: 80%; */
  /* margin-inline: auto; */
`;

const Tab = styled.li<{ active: boolean }>`
  /* flex-basis: 50%; */
  flex-grow: 1;
  button {
    padding: 1rem;
    font-size: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    transition: 0.2s ease;

    ${(props) =>
      props.active &&
      css`
        /* background: #1ab188; */
        /* color: #ffffff; */
      `}

    &:hover {
      /* background: #134725; */
      /* color: #ffffff; */
    }
  }
`;

const AuthModal: React.FC = () => {
  const { openAuth, isModalOpen } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();
  const ref = useOutsideClick(() => dispatch(closeAuthModal()));

  return (
    <CenteredModal isOpen={isModalOpen}>
      <FormContainer
        ref={ref}
        sx={{
          background: "grey",
        }}
      >
        <Tabs>
          <Tab active={openAuth === "signup"}>
            <button
              sx={{
                background: openAuth === "signup" ? "primary" : "lightgrey",
                color: openAuth === "signup" ? "text" : "lightergrey",
                ":hover": {
                  color: "lightestgrey",
                },
              }}
              onClick={() => dispatch(switchAuth("signup"))}
            >
              Sign Up
            </button>
          </Tab>
          <Tab active={openAuth === "login"}>
            <button
              sx={{
                background: openAuth === "login" ? "primary" : "lightgrey",
                color: openAuth === "login" ? "text" : "lightergrey",
                ":hover": {
                  color: "lightestgrey",
                },
              }}
              onClick={() => dispatch(switchAuth("login"))}
            >
              Log In
            </button>
          </Tab>
        </Tabs>
        {/* <div sx={{ marginInline: "auto" }}> */}
        {openAuth === "login" ? <Login /> : <Signup />}
        {/* </div> */}
      </FormContainer>
    </CenteredModal>
  );
};

export default AuthModal;
