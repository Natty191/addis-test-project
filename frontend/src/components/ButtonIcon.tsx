/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  /* border-radius: var(--border-radius-sm); */
  transition: all 0.2s;

  /* &:hover {
    background-color: var(--color-grey-100);
  } */

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* color: var(--color-brand-600); */
  }
`;

// const ButtonIcon = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <StyledButtonIcon sx={{ "&:hover": { color: "text" } }}>
//       {children}
//     </StyledButtonIcon>
//   );
// };

export default ButtonIcon;
