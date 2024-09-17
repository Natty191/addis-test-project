import styled from "@emotion/styled";
import Spinner from "./Spinner";

const StyledSpinnerFullPage = styled.div`
  height: calc(100vh - 5.7rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SpinnerFullPage() {
  return (
    <StyledSpinnerFullPage>
      <Spinner />
    </StyledSpinnerFullPage>
  );
}

export default SpinnerFullPage;
