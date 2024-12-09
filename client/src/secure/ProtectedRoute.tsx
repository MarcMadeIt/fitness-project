import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

import RouteModal from "../components/auth/RouteModal";
import { showLoginModal } from "../store/auth/authSlice";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const showModal = useSelector(
    (state: RootState) => state.auth.showLoginModal
  );

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(showLoginModal(true)); // Show modal if not authenticated
    }
  }, [isAuthenticated, dispatch]);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <>{showModal && <RouteModal defaultOpen="login" />}</>;
};

export default ProtectedRoute;
