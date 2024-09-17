import { Link } from "react-router-dom";
import { PopularGenre } from "../redux/songSlice";
import Card from "./Card";

const GenreCard = ({ genre }: { genre: PopularGenre }) => {
  return (
    <Link to={`/songs?genre=${genre.genre}`}>
      <Card
        title={genre.genre}
        subTitle="Genre"
        imageUrl={genre.topSong.artistImage}
        defaultImageUrl="/artist.jpg"
      ></Card>
    </Link>
  );
};

export default GenreCard;
