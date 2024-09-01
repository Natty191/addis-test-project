/** @jsxImportSource theme-ui */
import { Song } from "song";
import { Box, Image, Button } from "theme-ui";

const SongCard = ({ song }: { song: Song }) => {
  return (
    <Box
      sx={{
        width: ["30rem", "15rem", "12rem"], // Responsive widths
        bg: "background",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow
        borderRadius: "16px", // Rounded corners
        overflow: "hidden", // Ensures the content stays inside
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)", // Hover lift effect
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // Increase shadow depth on hover
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
          height: "auto",
        }}
      />

      {/* Song Details */}
      <Box sx={{ p: 3 }}>
        <h3
          sx={{
            m: 0,
            fontSize: 3,
            fontWeight: "bold",
            color: "text",
            whiteSpace: "nowrap", // Ensure title doesn't wrap
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {song.title}
        </h3>

        <p
          sx={{
            m: 0,
            mt: 2,
            fontSize: 2,
            color: "muted",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {song.artist}
        </p>

        {/* Play Button */}
        <Button
          variant="primary"
          sx={{
            mt: 3,
            width: "100%",
            bg: "primary",
            color: "background",
            display: "block",
            textAlign: "center",
            borderRadius: "8px",
            fontSize: 2,
            py: 2,
            transition: "background-color 0.3s ease",
            "&:hover": {
              bg: "secondary", // Changes color on hover
            },
          }}
        >
          Play
        </Button>
      </Box>
    </Box>
  );
};

export default SongCard;
