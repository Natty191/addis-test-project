/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { fetchSongsRequest, deleteSong } from "../redux/songSlice";
import styled from "@emotion/styled";
import { Song } from "song";

const FilterInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const SongContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  padding: 6px 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;
function SongList() {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector(
    (state: RootState) => state.songs
  );

  const [filter, setFilter] = useState({ genre: "", artist: "" });

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteSong(id));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const filteredSongs = songs.filter(
    (song) =>
      (filter.genre
        ? song.genre.toLowerCase().includes(filter.genre.toLowerCase())
        : true) &&
      (filter.artist
        ? song.artist.toLowerCase().includes(filter.artist.toLowerCase())
        : true)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <FilterInput
          type="text"
          name="genre"
          placeholder="Filter by Genre"
          value={filter.genre}
          onChange={handleFilterChange}
        />
        <FilterInput
          type="text"
          name="artist"
          placeholder="Filter by Artist"
          value={filter.artist}
          onChange={handleFilterChange}
        />
      </div>

      <div>
        {filteredSongs.map((song: Song) => (
          <SongContainer key={song.id}>
            <div>
              <p>
                <strong>Title:</strong> {song.title}
              </p>
              <p>
                <strong>Artist:</strong> {song.artist}
              </p>
              <p>
                <strong>Album:</strong> {song.album}
              </p>
              <p>
                <strong>Genre:</strong> {song.genre}
              </p>
            </div>
            <div>
              <DeleteButton onClick={() => handleDelete(song.id)}>
                Delete
              </DeleteButton>
              {/* add an Edit button here */}
            </div>
          </SongContainer>
        ))}
      </div>
    </div>
  );
}

export default SongList;
