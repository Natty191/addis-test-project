import { IconType } from "react-icons";
import { HiMusicNote } from "react-icons/hi";
import {
  HiAdjustmentsHorizontal,
  HiDocumentDuplicate,
  HiMiniUsers,
  HiSignal,
  HiUser,
} from "react-icons/hi2";

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
        href: "#",
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
        text: "Songs",
        href: "/search",
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
    title: "Playlists",
    navigations: [
      {
        text: "Doo Wom",
        href: "#",
      },
      {
        text: "Pop Classics",
        href: "#",
      },
      {
        text: "Love Songs",
        href: "#",
      },
    ],
  },
];
