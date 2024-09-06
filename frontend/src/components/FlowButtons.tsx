/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";

const StyledFlowButtons = styled.div`
  margin-left: 1rem;

  span {
    margin-left: 1rem;

    svg {
      translate: 0 0.15rem;
    }
  }
`;

const FlowButton = () => {
  return (
    <StyledFlowButtons
      sx={{
        span: { "&:hover": { color: "text" } },
        display: ["none", null, "block"],
      }}
    >
      <ButtonIcon>
        <HiOutlineChevronLeft />
      </ButtonIcon>
      <ButtonIcon>
        <HiOutlineChevronRight />
      </ButtonIcon>
    </StyledFlowButtons>
  );
};

export default FlowButton;
