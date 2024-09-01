import styled from "@emotion/styled";
import Search from "./Search";
import HeaderMunu from "./HeaderMenu";
import Logo from "./Logo";
import FlowButton from "./FlowButtons";

const StyledHeader = styled.header`
  background: rgb(40, 40, 40);
  padding: 1rem 3.5rem;
  color: rgb(170, 170, 170);
  border-bottom: 1px solid rgb(24, 24, 24);

  display: flex;
  flex-flow: row wrap;
  align-items: center;

  grid-column: 1 / -1;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      <FlowButton />
      <Search />
      <HeaderMunu />
    </StyledHeader>
  );
};

export default Header;
