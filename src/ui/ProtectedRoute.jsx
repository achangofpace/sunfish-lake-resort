import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;



function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. load the authenticated user
  const { isLoadingUser, isAuthenticated } = useUser();

  // 2. redirect to the /login route if there's no authenticated user
  useEffect(function() {
    if (!isAuthenticated && !isLoadingUser) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated, isLoadingUser]);

  // 3. while loading, show a spinner
  if (isLoadingUser) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4. render the app otherwise.
  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
