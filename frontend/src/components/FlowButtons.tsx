/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";

const FlowButtonsStyle = styled.div`
  margin-left: 1rem;

  span {
    font-size: 2.3rem;
    /* color: rgb(170, 170, 170); */
    margin-left: 1rem;

    svg {
      translate: 0 0.15rem;
    }
  }
`;

const FlowButton = () => {
  return (
    <FlowButtonsStyle sx={{ span: { "&:hover": { color: "text" } } }}>
      <ButtonIcon>
        <HiOutlineChevronLeft />
      </ButtonIcon>
      <ButtonIcon>
        <HiOutlineChevronRight />
      </ButtonIcon>
    </FlowButtonsStyle>
  );
};

export default FlowButton;
