/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { HiUser } from "react-icons/hi2";

const StyledUserAvatar = styled.div`
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const UserAvatar = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <StyledUserAvatar sx={{ display: ["flex", "flex"] }}>
      <HiUser size={20} />
      <span sx={{ display: ["none", "block"] }}>
        <span>{user?.name}</span>
      </span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
