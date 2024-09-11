/** @jsxImportSource theme-ui */
import { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import { deleteSongRequest } from "../redux/songSlice";
import { useDispatch } from "react-redux";
import { HiTrash } from "react-icons/hi2";
import { Song } from "song";
import CenteredModal from "./CenteredModal";

const DeleteButton = ({ song }: { song: Song }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  function handleConfirmDelete(id: string) {
    dispatch(deleteSongRequest(id));
    setIsModalOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        sx={{
          padding: "0 1rem",
          float: "right",
          marginLeft: "auto",
          visibility: "hidden",
          zIndex: 100,
          fontSize: 4,
          color: "red",
          borderRadius: "full",
          background: "grey",
          overflow: "hidden",
          // padding: "2rem",
          ":hover": {
            svg: { color: "orange" },
          },
          svg: {
            color: "lightergrey",
          },
        }}
      >
        <HiTrash />
      </button>
      <CenteredModal isOpen={isModalOpen}>
        <ConfirmDelete
          resourceName="Song"
          onConfirm={() => handleConfirmDelete(song._id)}
          onCloseModal={() => setIsModalOpen(false)}
          disabled={false}
        />
      </CenteredModal>
    </>
  );
};

export default DeleteButton;
