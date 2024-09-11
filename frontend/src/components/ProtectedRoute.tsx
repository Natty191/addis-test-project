import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getUserRequest, openAuthModal } from "../redux/authSlice";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loading, isAuthenticated, isModalOpen } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  if (!loading && !isAuthenticated && !isModalOpen) dispatch(openAuthModal());

  useEffect(() => {
    dispatch(getUserRequest());
  }, [dispatch]);

  // if (!loading && !isAuthenticated)
  if (loading)
    return (
      <FullPage>
        {/* <Spinner /> */}
        <div>Loading...</div>
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
