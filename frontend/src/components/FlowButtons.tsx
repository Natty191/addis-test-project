/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <StyledFlowButtons
      sx={{
        span: { "&:hover": { color: "text" } },
        display: ["none", null, "block"],
      }}
    >
      <ButtonIcon onClick={() => navigate(-1)}>
        <HiOutlineChevronLeft />
      </ButtonIcon>
      <ButtonIcon onClick={() => navigate(1)}>
        <HiOutlineChevronRight />
      </ButtonIcon>
    </StyledFlowButtons>
  );
};

export default FlowButton;
