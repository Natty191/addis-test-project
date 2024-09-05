/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { Song } from "song";

const StyledSongsFoundList = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    height: 100%;
  }
`;

const SongCard = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;

  a {
    /* font-size: 1rem; */
  }

  a {
    :hover {
      text-decoration: underline;
    }
  }
`;

const Image = styled.img`
  max-width: 3rem;
  aspect-ratio: 1.05;
  border-radius: 2px;
`;

const SongsFoundList = ({ songs }: { songs: Song[] }) => {
  return (
    <StyledSongsFoundList>
      {songs.slice(0, 4).map((song) => (
        <SongCard
          sx={{
            ":hover": {
              background: "lightgrey",
            },
          }}
        >
          <Image
            src="https://assets.audiomack.com/abusha-mesganew/5b54c92aba0c18661df39a814c76d723b612c42eaa642b154f1e16e5fc21d0c6.jpeg?width=1000&height=1000&max=true"
            alt=""
          />
          <Links sx={{ color: "lightestgrey" }}>
            <Link to="#">{song.title}</Link>
            <Link
              to="#"
              sx={{
                color: "lightergrey",
              }}
            >
              {song.artist}
            </Link>
          </Links>
        </SongCard>
      ))}
    </StyledSongsFoundList>
  );
};

export default SongsFoundList;
