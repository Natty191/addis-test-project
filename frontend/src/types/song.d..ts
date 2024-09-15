declare module "song" {
  export type Song = {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
    coverUrls: string[];
    artistImage: string;
  };
  // | {
  //     _id?: string;
  //     title: string;
  //     artist: string;
  //     album: string;
  //     genre: string;
  //     coverUrls: string[];
  //     artistImage: string;
  //   };
}
