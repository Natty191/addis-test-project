import { IconType } from "react-icons";
import { HiMusicNote } from "react-icons/hi";
import {
  HiAdjustmentsHorizontal,
  HiDocumentDuplicate,
  HiMiniUsers,
  HiSignal,
  HiUser,
} from "react-icons/hi2";
import store from "../redux/store";

const favoriteSongs = store
  .getState()
  .songs.popularSongs.filter((song) =>
    store.getState().auth.user?.favoriteSongs.includes(song._id)
  );

export type NavObject = {
  title: string;
  navigations: { text: string; href: string; icon?: IconType }[];
}[];

export const navigations: NavObject = [
  {
    title: "Main",
    navigations: [
      {
        text: "Browse",
        href: "/",
        icon: HiDocumentDuplicate,
      },
      {
        text: "Active",
        href: "#",
        icon: HiMiniUsers,
      },
      {
        text: "Radio",
        href: "#",
        icon: HiSignal,
      },
    ],
  },
  {
    title: "Your Music",
    navigations: [
      {
        text: "My Songs",
        href: "/my-songs",
        icon: HiAdjustmentsHorizontal,
      },
      {
        text: "Albums",
        href: "/search/album",
        icon: HiMusicNote,
      },
      {
        text: "Artists",
        href: "/search/artist",
        icon: HiUser,
      },
    ],
  },
  {
    title: "Your Favorites",
    navigations: favoriteSongs.map((song) => ({
      text: song.title,
      href: ``,
    })),
  },
];
