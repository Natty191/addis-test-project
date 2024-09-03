/** @jsxImportSource theme-ui */
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import styled from "@emotion/styled";
import {} from "theme-ui";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr;
  grid-template-rows: 5.7rem 1fr;
  height: 100vh;
`;

const Main = styled.main`
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;

  border-radius: 4px;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main sx={{ background: "darkgrey" }}>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
