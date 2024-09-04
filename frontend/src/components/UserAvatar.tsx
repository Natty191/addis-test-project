/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";

const StyledUserAvatar = styled.div`
  align-items: center;
  gap: 0.5rem;
`;

const Avatar = styled.img`
  max-width: 3rem;
  max-height: 3rem;
  border-radius: 50%;
  display: inline-block;
`;

const UserAvatar = () => {
  return (
    <StyledUserAvatar sx={{ display: ["none", "flex"] }}>
      <Avatar
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/adam_proPic.jpg"
        alt="Profile Picture"
      />
      <span sx={{ display: ["none", null, "block"] }}>
        <span>Adam Lowenthal</span>
      </span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
