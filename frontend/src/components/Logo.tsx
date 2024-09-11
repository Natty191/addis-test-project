/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const StyledLogo = styled(Link)`
  margin-inline: 2rem;
  width: 3rem;
`;

const Logo = () => {
  return (
    <StyledLogo to="/" sx={{ display: ["none", "block"] }}>
      <img src="/logo.png" alt="Logo" />
    </StyledLogo>
  );
};

export default Logo;
