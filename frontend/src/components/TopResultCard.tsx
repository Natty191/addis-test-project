/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { Link, useParams } from "react-router-dom";
import { Song } from "song";

const StyledTopResultCard = styled.div`
  padding: 2rem 1.75rem;
  border-radius: 6px;
  /* width: 45rem; */
  width: calc(7rem + 25vw);
  height: 100%;
  cursor: pointer;

  img {
    margin-bottom: 1.3rem;
  }

  h2 {
    font-size: 1.75em;
    margin-bottom: 0.1em;
  }

  p {
    a {
      white-space: "nowrap";
      overflow: "hidden";
      text-overflow: "ellipsis";

      :hover {
        text-decoration: underline;
      }
    }
  }
`;

function capitalize(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const TopResultCard = ({ song }: { song: Song }) => {
  const { filter } = useParams();

  return (
    <StyledTopResultCard
      sx={{
        bg: "grey",
        fontSize: [".8em", "1em"],
        ":hover": { bg: "lightgrey" },
      }}
    >
      <img
        src={`/${!filter || filter === "genre" ? "artist" : filter}.jpg`}
        alt=""
        sx={{ width: "10rem", aspectRatio: 1, borderRadius: "default" }}
      />

      <h2>{song[(filter as keyof Song) ?? "title"]}</h2>
      <p sx={{ color: "lightergrey", fontWeight: "body" }}>
        <span>{capitalize(filter ?? "Song")} &bull;&nbsp;&nbsp;</span>
        <Link to="#" sx={{ color: "lightestgrey", cursor: "pointer" }}>
          {song.artist}
        </Link>
      </p>
    </StyledTopResultCard>
  );
};

export default TopResultCard;
