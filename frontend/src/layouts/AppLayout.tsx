/** @jsxImportSource theme-ui */
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import styled from "@emotion/styled";
import { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserRequest } from "../redux/authSlice";
import AddSongModal from "../components/AddSongModal";
import SpinnerFullPage from "../components/SpinnerFullpage";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: 5.7rem 1fr;
  height: 100vh;
`;

const Main = styled.main`
  border-radius: 4px;
  overflow-y: scroll;
  position: relative;
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRequest());
  }, [dispatch]);

  return (
    <>
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
            <Suspense fallback={<SpinnerFullPage />}>
              <Outlet />
            </Suspense>
          </Container>
        </Main>
      </StyledAppLayout>
      <AddSongModal />
    </>
  );
};

export default AppLayout;
