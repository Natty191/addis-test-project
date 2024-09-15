/** @jsxImportSource theme-ui */
import { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import { deleteSongRequest } from "../redux/songSlice";
import { useDispatch } from "react-redux";
import { HiTrash } from "react-icons/hi2";
import CenteredModal from "./CenteredModal";

const DeleteButton = ({ songId }: { songId: string }) => {
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
          // position: "absolute",
          // zIndex: 10,
          // right: ".1rem",
          width: "2rem",
          height: "2rem",
          fontSize: 4,
          color: "red",
          overflow: "hidden",

          ":hover": {
            svg: { color: "lightred" },
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
          onConfirm={() => handleConfirmDelete(songId)}
          onCloseModal={() => setIsModalOpen(false)}
          disabled={false}
        />
      </CenteredModal>
    </>
  );
};

export default DeleteButton;
