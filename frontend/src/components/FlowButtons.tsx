import styled from "@emotion/styled";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const FlowButtonsStyle = styled.div`
  margin-left: 1rem;

  span {
    font-size: 2.3rem;
    color: rgb(170, 170, 170);
    margin-left: 1rem;

    svg {
      translate: 0 0.15rem;
    }

    &:hover {
      color: white;
    }
  }
`;

const FlowButton = () => {
  return (
    <FlowButtonsStyle>
      <span className="flow">
        <HiOutlineChevronLeft />
      </span>

      <span className="flow">
        <HiOutlineChevronRight />
      </span>
    </FlowButtonsStyle>
  );
};

export default FlowButton;
