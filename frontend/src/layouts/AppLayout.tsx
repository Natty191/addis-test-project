/** @jsxImportSource theme-ui */
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import styled from "@emotion/styled";
import { useState } from "react";
import Modal from "react-modal";
import LoginPage from "../components/AuthModal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: 5.7rem 1fr;
  height: 100vh;
`;

const Main = styled.main`
  border-radius: 4px;
  overflow-y: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const AppLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAuthModalOpen } = useSelector((state: RootState) => state.auth);

  return (
    <StyledAppLayout
      sx={{
        gridTemplateColumns: [
          "1fr",
          isDrawerOpen ? "24rem 1fr" : null,
          "24rem 1fr",
        ],
      }}
    >
      <Header setIsDrawerOpen={setIsDrawerOpen} />
      <Sidebar isDrawerOpen={isDrawerOpen} />
      <Main
        sx={{
          background: "darkgrey",
          paddingInline: [0, 4, 3],
          paddingBlock: [0, 1, 3],

          gridColumn: ["1 / -1", "initial"],
        }}
      >
        <Container>
          <Outlet />
        </Container>
      </Main>
      <Modal
        style={{
          content: {
            inset: "auto",
            margin: "auto",
            padding: "0",
            border: "none",
            background: "none",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "0",
            outline: "none",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          overlay: {
            backdropFilter: "blur(19px)",
            background: "rgba(0, 0, 0, 0.5)",
          },
        }}
        isOpen={isAuthModalOpen}
      >
        <LoginPage />
      </Modal>
    </StyledAppLayout>
  );
};

export default AppLayout;
