/** @jsxImportSource theme-ui */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { fetchSongsRequest } from "../redux/songSlice";
import styled from "@emotion/styled";
import { Song } from "song";
import SongCard from "./SongCard";
import Filter from "./Filter";
import { useParams, useSearchParams } from "react-router-dom";
import SearchResult from "./SearchResult";

const Songs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(23rem, 1fr));
  /* grid-auto-columns: 23rem; */
`;

function SongList() {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector(
    (state: RootState) => state.songs
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const { filter } = useParams();

  // const filter = searchParams.get("filter") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const query = { filter, value: searchParams.get("query") || "" };

  // const [filter, setFilter] = useState({ genre: "", artist: "" });

  useEffect(() => {
    dispatch(fetchSongsRequest({ filter, sortBy, query }));
  }, [filter, sortBy, query.value]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div sx={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <Filter
        options={[
          { label: "All", value: "" },
          { label: "Artist", value: "artist" },
          { label: "Album", value: "album" },
          { label: "Genre", value: "genre" },
        ]}
      />

      {/* <Songs>
        {songs.map((song: Song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </Songs> */}

      <SearchResult />
    </div>
  );
}

export default SongList;
