/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import SongCard from "../components/SongCard";
import { Song } from "song";
import { useSongs } from "../hooks/useSongs";

const Songs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(23rem, 1fr));
`;

function SongsList() {
  const { songs, loading, error } = useSongs();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div sx={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <Songs>
        {songs.all.map((song: Song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </Songs>
    </div>
  );
}

export default SongsList;
