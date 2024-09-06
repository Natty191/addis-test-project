/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import TopResultCard from "../components/TopResultCard";
import SongsFoundList from "../components/SongsFoundList";
import Filter from "../components/Filter";
import { useSongs } from "../hooks/useSongs";
import TitledSection from "../components/TitledSection";

const Row = styled.div`
  display: flex;
  gap: 1rem;
  overflow: hidden;
  /* align-items: stretch; */
  justify-content: stretch;
  padding: 1.25rem 0;

  h3 {
    font-size: 2.3rem;
    margin-block: 1.25rem;
  }
`;

const SearchResult = () => {
  const { songs, loading, error } = useSongs();

  if (songs.filtered.length === 0) return <div>No data</div>;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...{error}</div>;
  return (
    <div>
      <Filter
        options={[
          { label: "All", value: "" },
          { label: "Artist", value: "artist" },
          { label: "Album", value: "album" },
          { label: "Genre", value: "genre" },
        ]}
      />
      <Row sx={{ color: "lightestgrey" }}>
        <TitledSection title="Top Result">
          <TopResultCard song={songs.filtered[0]} />
        </TitledSection>

        <TitledSection title="Songs" grow>
          <SongsFoundList songs={songs.filtered} />
        </TitledSection>
      </Row>
    </div>
  );
};

export default SearchResult;
