import ProfileIcon from "../assets/ProfileIcon";
import NewPostIcon from "../assets/NewPostIcon";
import { HomeIcon, SearchIcon, Settings2Icon } from "lucide-react";
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
      name: "",
      path: "/newpost",
      icon: <NewPostIcon />,
      activeIcon: <NewPostIcon />,
    },
    {
      name: "options",
      path: "/options",
      icon: <Settings2Icon />,
      activeIcon: <Settings2Icon />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <ProfileIcon />,
      activeIcon: <ProfileIcon />,
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
                <div className="flex h-full w-full items-center justify-center gap-2 bg-white/10 rounded-md p-1">
                  {page.activeIcon}
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center gap-2">
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
