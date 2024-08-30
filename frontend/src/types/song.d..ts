declare module "song" {
  // type FethedSong = {
  //   id: string;
  //   title: string;
  //   artist: string;
  //   album: string;
  //   genre: string;
  // };

  // type NewSong = {
  //   title: string;
  //   artist: string;
  //   album: string;
  //   genre: string;
  // };

  // export type Song = FethedSong | NewSong;
  export type Song = {
    id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
  };
}
