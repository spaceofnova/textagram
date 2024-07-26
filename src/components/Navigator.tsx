import NewPostIcon from "../assets/NewPostIcon";
import { HomeIcon, SearchIcon, Settings2Icon, UserIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navigator() {
  const { pathname } = useLocation();
  const pages = [
    {
      name: "Home",
      path: "/",
      noColor: false,
      icon: <HomeIcon />,
      activeIcon: <HomeIcon />,
    },
    {
      name: "Search",
      path: "/search",
      noColor: false,
      icon: <SearchIcon />,
      activeIcon: <SearchIcon />,
    },
    {
      name: "",
      path: "/newpost",
      noColor: false,
      icon: <NewPostIcon />,
      activeIcon: <NewPostIcon />,
    },
    {
      name: "options",
      path: "/options",
      noColor: false,
      icon: <Settings2Icon />,
      activeIcon: <Settings2Icon />,
    },
    {
      name: "Profile",
      path: "/profile",
      noColor: false,
      icon: <UserIcon />,
      activeIcon: <UserIcon />,
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
            <div className="flex h-full w-full items-center justify-center relative">
              {pathname === page.path ? (
                <div
                  className={
                    "flex h-full w-full items-center justify-center gap-2 p-3 transition-all 200ms ease border-none border-accent" +
                    (page.noColor == false &&
                      " after:absolute after:w-full after:-translate-x-1/2 after:left-1/2 after:-top-[0.02rem] after:content-[''] after:h-[0.1rem] after:bg-accent after:transition-all")
                  }
                >
                  {page.activeIcon}
                </div>
              ) : (
                <div
                  className={
                    "flex h-full w-full items-center justify-center gap-2 p-3 transition-all 200ms ease border-none border-accent" +
                    (page.noColor == false &&
                      " after:absolute after:opacity-0 after:-translate-x-1/2 after:left-1/2 after:-top-[0.02rem] after:content-[''] after:h-0 after:bg-accent after:transition-all")
                  }
                >
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
