/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import Search from "./Search";
import HeaderMunu from "./HeaderMenu";
import Logo from "./Logo";
import FlowButton from "./FlowButtons";
import { HiBars3 } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";

const StyledHeader = styled.header`
  /* background: rgb(40, 40, 40); */
  padding: 1rem 3.5rem;
  /* color: rgb(170, 170, 170); */
  /* border-bottom: 1px solid rgb(0, 0, 0); */

  display: flex;
  flex-flow: row wrap;
  align-items: center;

  grid-column: 1 / -1;
`;

const Header = ({
  setIsDrawerOpen,
}: {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <StyledHeader
      sx={{
        background: "background",
        color: "lightgrey",
        boxShadow: "small",
        paddingInline: [0],

        // display: [null, null, "none"],d

        button: {
          "&:hover": { color: "text" },
        },
      }}
    >
      <ButtonIcon
        onClick={() => setIsDrawerOpen((open) => !open)}
        sx={{
          paddingInline: "2rem",
          zIndex: 10,
          display: [null, null, "none"],
        }}
      >
        <HiBars3 />
      </ButtonIcon>
      <Logo />
      <FlowButton />
      <Search />
      <HeaderMunu />
    </StyledHeader>
  );
};

export default Header;
