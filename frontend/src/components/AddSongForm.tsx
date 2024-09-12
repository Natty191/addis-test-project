/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import Button from "./Button";
import H1 from "./H1";
import Input from "./Input";
import Label from "./Label";
import { useForm } from "react-hook-form";
import { closeAuthModal } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import FormError from "./FormError";
import { Song } from "song";
import { addSongStart, searchSongToCreateRequst } from "../redux/songSlice";
import SongsFoundList from "./SongsFoundList";
import { RootState } from "../redux/store";
import { useDeferredValue, useEffect, useState } from "react";

const InputWrap = styled.div`
  position: relative;
`;

const AddSongForm = () => {
  const dispatch = useDispatch();
  const { songsFound } = useSelector((state: RootState) => state.songs);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Song>();
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  const deferredFormData = useDeferredValue(formData);

  const { title, artist, album, genre } = watch();

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
    // dispatch(searchSongToCreateRequst(formData));
  }

  function onSubmit() {
    // dispatch(addSongStart(data));
    dispatch(closeAuthModal());
  }

  useEffect(() => {
    // const song = getValues();

    dispatch(searchSongToCreateRequst(deferredFormData));
  }, [deferredFormData, dispatch]);

  return (
    <form
      sx={{
        width: "35rem",
        margin: "3rem auto",
        display: "flex",
        flexDirection: "column",
        gap: "3em",
        fontSize: "1rem",
        // height: "40rem",
      }}
      onSubmit={onSubmit}
    >
      <H1>Create Song</H1>
      <InputWrap>
        {errors.title && <FormError>{errors.title.message}</FormError>}
        <Label>Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          // register={register("title", { required: "Title is required" })}
          // type="title"
          // onChange={() =>
          //   dispatch(searchSongToCreateRequst({ title, artist, album, genre }))
          // }
        />
      </InputWrap>

      <InputWrap>
        {errors.artist && <FormError>{errors.artist.message}</FormError>}
        <Label>Artist</Label>
        <Input
          name="artist"
          value={formData.artist}
          onChange={handleFormChange}
          required
          // register={register("artist", {
          //   required: "Artist is required",
          // })}
          // type="artist"
        />
        <SongsFoundList
          sx={{
            position: "absolute",
            zIndex: 10,
            right: 0,
            "> div": { bg: "lightgrey" },
          }}
          songs={songsFound}
        />
      </InputWrap>

      <InputWrap>
        {errors.album && <FormError>{errors.album.message}</FormError>}
        <Label>Album</Label>
        <Input
          name="album"
          value={formData.album}
          onChange={handleFormChange}
          required
          // register={register("album", {
          //   required: "Album is required",
          // })}
          // type="album"
        />
      </InputWrap>

      <InputWrap>
        {errors.genre && <FormError>{errors.genre.message}</FormError>}
        <Label>Genre</Label>
        <Input
          value={formData.genre}
          onChange={handleFormChange}
          required
          // register={register("genre", {
          //   required: "Genre is required",
          // })}
          // type="genre"
        />
      </InputWrap>

      <Button
        type="submit"
        size="large"
        sx={{
          width: "100%",
          marginTop: "2.5rem",
          padding: "1rem 0",
          fontSize: "2rem",
        }}
      >
        Sign Up
      </Button>
    </form>
  );
};

export default AddSongForm;
