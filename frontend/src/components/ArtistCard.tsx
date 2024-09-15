import { PopularArtist } from "../redux/songSlice";
import Card from "./Card";

const ArtistCard = ({ artist }: { artist: PopularArtist }) => {
  return (
    <Card
      type="circular"
      title={artist.artist}
      subTitle="Artist"
      imageUrl={artist.artistImage ?? ""}
      defaultImageUrl="/artist.jpg"
    ></Card>
  );
};

export default ArtistCard;
