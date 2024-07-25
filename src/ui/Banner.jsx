import styled from "styled-components";
import useUser from "../features/authentication/useUser";

const StyledBanner = styled.div`
  text-align: center;
  font-size: large;
  font-weight: bold;
  background-color: var(--color-green-100);
`;

function Banner() {
  const { user } = useUser();
  if (user.email !== "demo@example.com") {
    return null;
  }
  return (
    <StyledBanner>
      <p>This is a demo. All modified data will be reset on login/logout.</p>
    </StyledBanner>
  );
}

export default Banner;
