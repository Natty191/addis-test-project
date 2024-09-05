/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import TopResultCard from "./TopResultCard";
import { Link, useParams } from "react-router-dom";
import SongsFoundList from "./SongsFoundList";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Song } from "song";

const Row = styled.div`
  height: 30rem;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  gap: 2rem;

  h3 {
    font-size: 2.3rem;
    padding: 1.25rem 0;
  }
`;

const SearchResult = () => {
  const { songs } = useSelector((state: RootState) => state.songs);
  const { filter } = useParams();

  const filteredSongs: Song[] = !filter
    ? songs.all
    : songs.filtered.length > 0
    ? songs.filtered
    : songs.all;

  return (
    <Row sx={{ fontSize: "1.5rem", color: "lightestgrey" }}>
      <div>
        <h3>Top result</h3>
        <TopResultCard song={filteredSongs[0]} />
      </div>
      <div sx={{ flexGrow: 1 }}>
        <h3>Songs</h3>
        <SongsFoundList songs={filteredSongs} />
      </div>
    </Row>
  );
};

export default SearchResult;
