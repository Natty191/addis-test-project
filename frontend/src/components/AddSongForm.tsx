/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSongStart } from "../redux/songSlice";
import styled from "@emotion/styled";

const StyledAddSong = styled.div`
  margin-block: auto;
`;

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  /* box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); */
  background: "grey";

  h2 {
    text-align: center;
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  padding: 0.6rem 1.4rem;
  /* border: 1px solid #ccc; */
  border-radius: 10rem;
  background: rgba(255, 255, 255, 0.1);
  font-size: 16px;
  margin-bottom: 0.8rem;

  :focus {
    outline: 2px solid green;
  }

  ::placeholder {
    color: "#838383";
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #192e16;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddSongForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const [genre, setGenre] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSong = {
      title,
      artist,
      album,
      genre,
    };

    dispatch(addSongStart(newSong));

    // Clear form after submission
    setTitle("");
    setArtist("");
    setAlbum("");
    setGenre("");
  };

  return (
    <Form onSubmit={handleSubmit} sx={{ color: "lightestgrey" }}>
      <h2>Create Song</h2>
      <FormGroup>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
      </FormGroup>

      <FormGroup>
        <Input
          id="artist"
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Artist"
          required
        />
      </FormGroup>

      <FormGroup>
        <Input
          id="album"
          type="text"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          placeholder="Album"
          required
        />
      </FormGroup>

      <FormGroup>
        <Input
          id="genre"
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
          required
        />
      </FormGroup>

      <Button type="submit">Add Song</Button>
    </Form>
  );
};

export default AddSongForm;
