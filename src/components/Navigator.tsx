import {
  BellIcon,
  HomeIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navigator() {
  const { pathname } = useLocation();
  const pages = [
    {
      name: "Home",
      path: "/",
      icon: <HomeIcon />,
      activeIcon: <HomeIcon filter="hue-rotate(120deg)" />,
    },
    {
      name: "Search",
      path: "/search",
      icon: <SearchIcon />,
      activeIcon: <SearchIcon />,
    },
    {
      name: "New Post",
      path: "/newpost",
      icon: <PlusIcon />,
      activeIcon: <PlusIcon />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: <BellIcon />,
      activeIcon: <BellIcon />,
    },
    {
      name: "Options",
      path: "/options",
      icon: <SettingsIcon />,
      activeIcon: <SettingsIcon />,
    },
  ];
  return (
    <div className="flex w-full h-12 justify-evenly fixed bottom-0 bg-background">
      {pages.map((page) => (
        <div
          key={page.name}
          className="flex h-full w-12 items-center justify-center rounded-md transition-all duration-300 ease-in-out"
        >
          <Link to={page.path}>
            <div className="flex h-full w-full items-center justify-center">
              {pathname === page.path ? (
                <div className="flex h-full w-full items-center justify-center">
                  {page.activeIcon}
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  {page.icon}
                </div>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
