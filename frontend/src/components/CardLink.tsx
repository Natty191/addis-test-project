import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const CardLink = styled(Link)`
  width: min-content;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

export default CardLink;
