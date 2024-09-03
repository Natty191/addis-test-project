/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { fetchSongsRequest } from "../redux/songSlice";
import styled from "@emotion/styled";
import { Song } from "song";
import SongCard from "./SongCard";
import Filter from "./Filter";

const Songs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(23rem, 1fr));
  grid-auto-columns: 23rem;
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
      <Filter
        filterField="filterBy"
        options={[
          { label: "Genre", value: "genre" },
          { label: "Artist", value: "artist" },
        ]}
      />

      <Songs>
        {filteredSongs.map((song: Song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </Songs>
    </div>
  );
}

export default SongList;
