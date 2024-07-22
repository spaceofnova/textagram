import NewPostIcon from "../assets/NewPostIcon";
import { BellIcon, HomeIcon, SearchIcon, SettingsIcon } from "lucide-react";
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
      icon: <NewPostIcon />,
      activeIcon: <NewPostIcon />,
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
    <div className="flex w-full h-12 justify-evenly fixed bottom-0 bg-background border-t-[0.01rem] border-white/20">
      {pages.map((page) => (
        <div
          key={page.name}
          className="flex h-full w-12 items-center justify-center rounded-md"
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
