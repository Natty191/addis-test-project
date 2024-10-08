/** @jsxImportSource theme-ui */
import { openAddModal, setEditSong } from "../redux/songSlice";
import { useDispatch } from "react-redux";
import { HiPencil } from "react-icons/hi2";
import { Song } from "song";

const EditButton = ({ song }: { song: Song }) => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => {
          dispatch(setEditSong(song));
          dispatch(openAddModal());
        }}
        sx={{
          width: "2rem",
          height: "2rem",
          fontSize: 4,
          color: "red",
          overflow: "hidden",

          ":hover": {
            svg: { color: "lightestgrey" },
          },
          svg: {
            color: "lightergrey",
          },
        }}
      >
        <HiPencil />
      </button>
    </>
  );
};

export default EditButton;
