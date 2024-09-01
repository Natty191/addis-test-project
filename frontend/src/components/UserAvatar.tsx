import styled from "@emotion/styled";

const StyledUserAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    max-width: 3rem;
    max-height: 3rem;
    border-radius: 50%;
    display: inline-block;
  }
`;

const UserAvatar = () => {
  return (
    <StyledUserAvatar>
      {/* <div className="user__info"> */}
      <span className="user__info__img">
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/adam_proPic.jpg"
          alt="Profile Picture"
          className="img-responsive"
        />
      </span>

      <span className="user__info__name">
        <span className="first">Adam</span>

        <span className="last">Lowenthal</span>
      </span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
