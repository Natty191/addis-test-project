import { Link } from "react-router-dom";
import { PopularAlbum } from "../redux/songSlice";
import Card from "./Card";

const AlbumCard = ({ album }: { album: PopularAlbum }) => {
  return (
    <Link to={`/songs?album=${album.album}`}>
      <Card
        title={album.album}
        subTitle={album.artist}
        imageUrl={album.coverUrls?.[1] ?? ""}
        defaultImageUrl="/album.jpg"
        subTitleLink={`/songs?artist=${album.artist}`}
      ></Card>
    </Link>
  );
};

export default AlbumCard;
