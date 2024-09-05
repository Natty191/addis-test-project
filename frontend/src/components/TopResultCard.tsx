/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Song } from "song";

const StyledTopResultCard = styled.div`
  padding: 2rem 1.75rem;
  background: darkgrey;
  border-radius: 5px;
  width: 40rem;
  cursor: pointer;
  /* font-size: 2.6em; */

  img {
    margin-bottom: 1.3rem;
  }

  h2 {
    font-size: 1.75em;
    margin-bottom: 0.1em;
  }

  p {
    margin-bottom: 1rem;

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
        sx={{ width: "10rem", borderRadius: "default" }}
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
