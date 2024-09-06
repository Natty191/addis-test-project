/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
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

const TopResultCard = ({ song }: { song: Song }) => {
  return (
    <StyledTopResultCard
      sx={{
        bg: "grey",
        fontSize: [".8em", "1em"],
        ":hover": { bg: "lightgrey" },
      }}
    >
      <img
        src="https://assets.audiomack.com/abusha-mesganew/5b54c92aba0c18661df39a814c76d723b612c42eaa642b154f1e16e5fc21d0c6.jpeg?width=1000&height=1000&max=true"
        alt=""
        sx={{ width: "10rem", aspectRatio: 1, borderRadius: "default" }}
      />

      <h2>{song.title}</h2>
      <p sx={{ color: "lightergrey", fontWeight: "body" }}>
        <span>Song . </span>
        <Link to="#" sx={{ color: "lightestgrey", cursor: "pointer" }}>
          {song.artist}
        </Link>
      </p>
    </StyledTopResultCard>
  );
};

export default TopResultCard;
