/** @jsxImportSource theme-ui */
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import styled from "@emotion/styled";
import { useState } from "react";

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
          paddingInline: [0, 2, 4],

          gridColumn: ["1 / -1", "initial"],
        }}
      >
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
