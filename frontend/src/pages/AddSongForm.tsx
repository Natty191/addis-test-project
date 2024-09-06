import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSongStart } from "../redux/songSlice";
import styled from "@emotion/styled";

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  color: black;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function AddSongForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("Libe Sew");
  const [artist, setArtist] = useState<string>("Dawit Tsige");
  const [album, setAlbum] = useState<string>("Yene Zema");
  const [genre, setGenre] = useState<string>("Ethiopian");

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
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="artist">Artist</Label>
        <Input
          id="artist"
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="album">Album</Label>
        <Input
          id="album"
          type="text"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="genre">Genre</Label>
        <Input
          id="genre"
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
      </FormGroup>

      <Button type="submit">Add Song</Button>
    </Form>
  );
}

export default AddSongForm;
