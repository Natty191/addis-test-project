import { PopularGenre } from "../redux/songSlice";
import Card from "./Card";

const GenreCard = ({ genre }: { genre: PopularGenre }) => {
  return (
    <Card
      title={genre.genre}
      subTitle="Genre"
      imageUrl={genre.topSong.artistImage}
      defaultImageUrl="/artist.jpg"
    ></Card>
  );
};

export default GenreCard;
