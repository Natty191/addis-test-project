/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import Button from "./Button";
import H1 from "./H1";
import Input from "./Input";
import Label from "./Label";
import SongsListCard from "./SongsListICard";
import { useDispatch, useSelector } from "react-redux";
import {
  addSongStart,
  NewSong,
  searchSongToCreateRequst,
  updateSongRequest,
} from "../redux/songSlice";
import { RootState } from "../redux/store";
import { useDeferredValue, useEffect, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { toast } from "react-toastify";
import { openAuthModal } from "../redux/authSlice";
import { Song } from "song";
import SpinnerMini from "./SpinnerMiini";

const StyledForm = styled.form`
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  gap: 3em;
  font-size: 1rem;
  position: relative;
  width: 100%;
`;

const InputWrap = styled.div`
  position: relative;
`;

const AutoComplete = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  left: 50%;
  translate: -20%;
  width: 19rem;
  overflow: hidden;
  :hover * {
    text-decoration: none !important;
  }
`;

const AddSongForm = ({ editSong }: { editSong?: Song | null }) => {
  const [distanceTop, setDistanceTop] = useState(0);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const dispatch = useDispatch();
  const { songsFound, loadingAddSong } = useSelector(
    (state: RootState) => state.songs
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const ref = useOutsideClick(() => {
    setShowAutocomplete(false);
  });

  const [formData, setFormData] = useState<NewSong>({
    title: editSong?.title ?? "",
    artist: editSong?.artist ?? "",
    album: editSong?.album ?? "",
    genre: editSong?.genre ?? "",
    coverUrls: editSong?.coverUrls ?? [],
    artistId: "",
    previewAudioUrl: "",
  });

  const deferredFormData = useDeferredValue(formData);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]:
        e.target.name !== "coverUrls"
          ? e.target.value
          : [e.target.value, e.target.value, e.target.value],
    }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.info("You need to be logged in to add a song");
      dispatch(openAuthModal());
    } else {
      if (editSong?._id) {
        dispatch(updateSongRequest({ song: formData, id: editSong._id }));
      } else {
        dispatch(addSongStart(formData));
      }
    }
  }

  function onInputFocus(e: React.FocusEvent<HTMLFormElement, Element>) {
    if (
      e.target.name !== "title" &&
      e.target.name !== "album" &&
      e.target.name !== "artist" &&
      e.target.name !== "genre"
    )
      return;
    setShowAutocomplete(true);
    setDistanceTop(e.target.getBoundingClientRect().top);
  }

  useEffect(() => {
    if (
      formData.title === "" &&
      formData.artist === "" &&
      formData.album === "" &&
      formData.coverUrls[0] === ""
    )
      return;
    dispatch(searchSongToCreateRequst(deferredFormData));
  }, [deferredFormData, dispatch]);

  return (
    <StyledForm onSubmit={onSubmit} onInput={onInputFocus}>
      <H1>{editSong ? "Edit " : "Create "} Song</H1>
      <InputWrap>
        <Label>Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          required
        />
      </InputWrap>

      <InputWrap>
        <Label>Artist</Label>
        <Input
          name="artist"
          value={formData.artist}
          onChange={handleFormChange}
          required
        />
      </InputWrap>

      <InputWrap>
        <Label>Album</Label>
        <Input
          name="album"
          value={formData.album}
          onChange={handleFormChange}
          required
        />
      </InputWrap>

      <InputWrap>
        <Label>Genre</Label>
        <Input
          name="genre"
          value={formData.genre}
          onChange={handleFormChange}
        />
      </InputWrap>

      <InputWrap>
        <Label>Cover Image URL</Label>
        <Input
          name="coverUrls"
          value={formData.coverUrls[0]}
          onChange={handleFormChange}
          required
        />
        <img src={formData.coverUrls[0]} alt="" />
      </InputWrap>

      <Button
        type="submit"
        size="large"
        disabled={loadingAddSong}
        sx={{
          width: "100%",
          marginTop: "2.5rem",
          padding: "1rem 0",
          fontSize: "2rem",
        }}
      >
        {loadingAddSong ? <SpinnerMini /> : `${editSong ? "Edit" : "Add"} Song`}
      </Button>

      {showAutocomplete && (
        <AutoComplete
          ref={ref}
          sx={{
            top: distanceTop - 34,
            "> div": { bg: "lightgrey" },
          }}
        >
          {songsFound.map((song) => (
            <SongsListCard
              key={song.artistId}
              onClick={() => {
                setShowAutocomplete(false);
                setFormData(song);
                // dispatch(reset());
              }}
              song={song as unknown as Song}
            />
          ))}
        </AutoComplete>
      )}
    </StyledForm>
  );
};

export default AddSongForm;
