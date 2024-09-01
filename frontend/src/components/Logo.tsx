import styled from "@emotion/styled";

const StyledLogo = styled.div`
  width: 3rem;
`;

const Logo = () => {
  return (
    <StyledLogo>
      <img
        src="https://i.pinimg.com/originals/15/4a/3b/154a3b66f70a24c44e1410c4338572a2.png"
        alt="Logo"
      />
    </StyledLogo>
  );
};

export default Logo;
