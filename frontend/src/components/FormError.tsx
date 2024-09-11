/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import React from "react";

const StyledFormError = styled.p<React.HTMLProps<HTMLParagraphElement>>`
  position: absolute;
  top: -2.5rem;
  color: #ff0000;
  background: rgb(61, 0, 0);
  margin-bottom: 0.3rem;
  padding: 0.3rem 1rem;
  border-radius: 10rem;
  width: max-content;
`;

const FormError = ({ ...props }) => {
  return (
    <StyledFormError sx={{ color: "red", background: "darkred" }} {...props} />
  );
};

export default FormError;
