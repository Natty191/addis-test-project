/** @jsxImportSource theme-ui */
import { Song } from "song";
import { Box, Image } from "theme-ui";
import { space, color, layout, border } from "styled-system";
import styled from "@emotion/styled";

const Card = styled(Box)(space, color, layout, border);

const SongCard = ({ song }: { song: Song }) => {
  return (
    <Card
      sx={{
        padding: "1.4rem",
        // width: ["12rem", "15rem", "20rem"], // Responsive widths
        // minWidth: "20rem", // Responsive widths

        // boxShadow: "0 4px 12px hsla(0, 0%, 0%, 0.1)",
        borderRadius: "0.6rem",
        overflow: "hidden",
        transition:
          "background .2s linear, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",

        cursor: "pointer",

        "&:hover": {
          bg: "grey",
          boxShadow: "medium",
        },
      }}
    >
      {/* Song Cover Image */}
      <Image
        // src={song.cover}
        src="https://assets.audiomack.com/abusha-mesganew/5b54c92aba0c18661df39a814c76d723b612c42eaa642b154f1e16e5fc21d0c6.jpeg?width=1000&height=1000&max=true"
        alt={song.title}
        sx={{
          width: "100%",
          aspectRatio: 1.1,
          objectFit: "cover",
          borderRadius: "0.5rem",
          marginBottom: "1rem",
          // height: "auto",
        }}
      />

      {/* Song Details */}
      <Box
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          letterSpacing: ".12rem",
        }}
      >
        <h3
          sx={{
            m: 0,
            width: "min-content",
            // fontSize: "1.6rem",
            fontSize: 3,
            fontWeight: "300",
            fontFamily: "Poppins",
            // letterSpacing: "0.07rem",
            color: "text",
            whiteSpace: "nowrap", // Ensure title doesn't wrap
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",
          }}
        >
          {song.title}
        </h3>

        <p
          sx={{
            m: 0,
            width: "min-content",
            // mt: 2,
            fontSize: 0,
            color: "lightgrey",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {song.artist}
        </p>
      </Box>
    </Card>
  );
};

export default SongCard;
