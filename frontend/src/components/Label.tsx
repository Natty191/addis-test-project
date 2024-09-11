/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledLabel = styled.label`
  position: absolute;
  transition: all 0.25s ease;
  backface-visibility: hidden;
  -webkit-backface-visibility: "hidden";
  pointer-events: none;

  transform: translateY(0.3em);
  /* left: 13px; */
  font-size: 2.1em;
  &.active {
    transform: translateY(2.7em);
    left: 2px;
    font-size: 1.5em;
  }
`;

const Label = ({ children }: { children: ReactNode }) => {
  return (
    <StyledLabel
      sx={{
        color: "lightergrey",
        span: {
          margin: "2px",
          color: "#1ab188",
        },
        "&.active span": {
          opacity: 0,
        },
      }}
    >
      {children}
      <span>*</span>
    </StyledLabel>
  );
};

export default Label;
