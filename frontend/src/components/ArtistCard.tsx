import { Link } from "react-router-dom";
import { PopularArtist } from "../redux/songSlice";
import Card from "./Card";

const ArtistCard = ({ artist }: { artist: PopularArtist }) => {
  return (
    <Link to={`/songs?artist=${artist.artist}`}>
      <Card
        type="circular"
        title={artist.artist}
        subTitle="Artist"
        imageUrl={artist.artistImage ?? ""}
        defaultImageUrl="/artist.jpg"
      ></Card>
    </Link>
  );
};

export default ArtistCard;
