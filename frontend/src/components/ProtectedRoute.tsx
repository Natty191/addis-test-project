import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getUserRequest, openAuthModal } from "../redux/authSlice";
import SpinnerFullPage from "./SpinnerFullpage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loading, isAuthenticated, isModalOpen } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  if (!loading && !isAuthenticated && !isModalOpen) dispatch(openAuthModal());

  useEffect(() => {
    dispatch(getUserRequest());
  }, [dispatch]);

  if (loading) return <SpinnerFullPage />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
