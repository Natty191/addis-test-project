/** @jsxImportSource theme-ui */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import CenteredModal from "./CenteredModal";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { RootState } from "../redux/store";
import AddSongForm from "./AddSongForm";
import { closeAddModal } from "../redux/songSlice";
import { Song } from "song";

const FormContainer = styled.div`
  /* padding: 4rem; */
  width: 46rem;
  height: 100vh;
  overflow-y: scroll;
  padding: 4rem;
  border-radius: 4px;
  box-shadow: 0 4px 10px 4px rgba(19, 35, 47, 0.3);
  display: flex;
  flex-direction: column;
  gap: 4rem;
  font-size: 1.1rem;
`;

const AddSongModal = () => {
  const { isAddModalOpen, editSong } = useSelector(
    (state: RootState) => state.songs
  );

  const dispatch = useDispatch();
  const ref = useOutsideClick(() => dispatch(closeAddModal()));

  return (
    <CenteredModal isOpen={isAddModalOpen}>
      <FormContainer
        ref={ref}
        sx={{
          background: "grey",
        }}
      >
        <AddSongForm editSong={editSong} />
      </FormContainer>
    </CenteredModal>
  );
};

export default AddSongModal;
