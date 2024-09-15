/** @jsxImportSource theme-ui */
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { background } from "styled-system";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const StyledSpinner = styled.div`
  margin: 4.8rem auto;

  width: 5.6rem;
  aspect-ratio: 1;
  border-radius: 50%;
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 5px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`;

const Spinner = ({ ...props }) => {
  return (
    <StyledSpinner
      sx={(props) => ({
        background: `radial-gradient(farthest-side, ${props.colors?.primary}  94%, #0000) top/5px 5px no-repeat, conic-gradient(#0000 30%, #28df68)`,
      })}
      {...props}
    />
  );
};

export default Spinner;
