"use client";

import {
  HomeIcon,
  LayoutTemplateIcon,
  SettingsIcon,
  ShareIcon,
  TrashIcon,
} from "lucide-react";

export const data = {
  user: {
    name: "shadcn",
    email: "shadcn@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: "Shared",
      url: "/shared",
      icon: ShareIcon,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: LayoutTemplateIcon,
    },
    {
      title: "Trash",
      url: "/trash",
      icon: TrashIcon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: SettingsIcon,
    },
  ],
};
