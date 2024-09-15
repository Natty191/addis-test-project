import { PopularAlbum } from "../redux/songSlice";
import Card from "./Card";

const AlbumCard = ({ album }: { album: PopularAlbum }) => {
  return (
    <Card
      title={album.album}
      subTitle={album.artist}
      imageUrl={album.coverUrls?.[1] ?? ""}
      defaultImageUrl="/album.jpg"
      subTitleLink={album.artist}
    ></Card>
  );
};

export default AlbumCard;
