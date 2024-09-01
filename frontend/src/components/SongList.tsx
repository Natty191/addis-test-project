/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { fetchSongsRequest } from "../redux/songSlice";
import styled from "@emotion/styled";
import { Song } from "song";
import SongCard from "./SongCard";
import Filter from "./Filter";
import { Box } from "theme-ui";
import {
  space,
  layout,
  border,
  color,
  gridAutoRows,
  gridAutoColumns,
} from "styled-system";

const Songs = styled(Box)(space, border, layout, color);

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

      <Songs
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(23rem, 1fr))",
          gridAutoColumns: "23rem",
        }}
      >
        {filteredSongs.map((song: Song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </Songs>
    </div>
  );
}

export default SongList;
