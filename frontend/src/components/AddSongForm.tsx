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
import { addSongStart } from "../redux/songSlice";
import SongsFoundList from "./SongsFoundList";
import { RootState } from "../redux/store";
import { useEffect } from "react";

const InputWrap = styled.div`
  position: relative;
`;

const AddSongForm = () => {
  const dispatch = useDispatch();
  const { songs } = useSelector((state: RootState) => state.songs);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Song>();

  function onSubmit(data: Song) {
    dispatch(addSongStart(data));
    dispatch(closeAuthModal());
  }

  useEffect(() => {}, []);

  return (
    <form
      sx={{
        width: "35rem",
        marginInline: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "3em",
        fontSize: "1rem",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <H1>Create Song</H1>
      <InputWrap>
        {errors.title && <FormError>{errors.title.message}</FormError>}
        <Label>Title</Label>
        <Input
          register={register("title", { required: "Title is required" })}
          type="title"
        />
      </InputWrap>

      <InputWrap>
        {errors.artist && <FormError>{errors.artist.message}</FormError>}
        <Label>Artist</Label>
        <Input
          register={register("artist", {
            required: "Artist is required",
          })}
          type="artist"
        />
        <SongsFoundList
          sx={{
            position: "absolute",
            zIndex: 10,
            right: 0,
            "> div": { bg: "lightgrey" },
          }}
          songs={songs.all}
        />
      </InputWrap>

      <InputWrap>
        {errors.album && <FormError>{errors.album.message}</FormError>}
        <Label>Album</Label>
        <Input
          register={register("album", {
            required: "Album is required",
          })}
          type="album"
        />
      </InputWrap>

      <InputWrap>
        {errors.genre && <FormError>{errors.genre.message}</FormError>}
        <Label>Genre</Label>
        <Input
          register={register("genre", {
            required: "Genre is required",
          })}
          type="genre"
        />
      </InputWrap>

      <Button
        type="submit"
        size="large"
        sx={{
          width: "100%",
          marginTop: "auto",
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
