import React, { useEffect, useState } from "react";
import { ReactComponent as LogoText } from "./../assets/icons/logo-text.svg";
import { ReactComponent as HomeIcon } from "./../assets/icons/home.svg";
import { ReactComponent as FilesIcon } from "./../assets/icons/drive.svg";
import { ReactComponent as SettingIcon } from "./../assets/icons/setting.svg";
import { ReactComponent as SwissIcon } from "./../assets/icons/swiss.svg";
import { useNavigate } from "react-router-dom";

export type SidebarProps = {
  active?: string;
  show?: boolean;
};

export type MenuItem = {
  id: string;
  title: string;
  icon: any;
  comingSoon?: boolean;
  href: string;
};

const menu: MenuItem[] = [
  {
    id: "",
    title: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    id: "files",
    title: "Files",
    icon: FilesIcon,
    href: "/files",
  },
  {
    id: "settings",
    title: "Settings",
    icon: SettingIcon,
    href: "/settings",
  },
];

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ active, show }, ref) => {
    const [pointerPosition, setPointerPosition] = useState(() => {
      let item = menu.find((item) => item.id === active);
      if (!item) return item;
      return menu.indexOf(item) * 48;
    });

    const [hover, setHover] = useState<string | undefined>();
    const navigate = useNavigate();

    useEffect(() => {
      const item =
        menu.find((item) => item.id === hover) ||
        menu.find((item) => item.id === active);
      if (item) {
        setPointerPosition(menu.indexOf(item) * 48);
      }
    }, [active, hover]);

    const handleMouseEnter = (id: string) => {
      setHover(id);
    };

    const handleMouseLeave = () => {
      setHover(undefined);
    };

    return (
      <div
        className={`${
          show ? "left-0" : ""
        } w-[260px] h-full fixed border-r-2 border-slate-100 -left-[260px] lg:left-0 transition-all duration-500 ease-[cubic-bezier(.83,-.01,.45,.99)] z-40 bg-white overflow-y-auto`}
        ref={ref}
      >
        <div className="flex items-center gap-1 py-4 px-8">
          <LogoText className="w-[90px]" />
        </div>
        <div className="w-full flex relative">
          {active !== undefined && (
            <span
              className="w-[5px] h-12 block bg-sky-600 absolute transition-all duration-300 ease-[cubic-bezier(.5,-.02,.27,1.31)] top-0 rounded-r-md"
              style={{ top: pointerPosition }}
            />
          )}
          <ul className="pb-4 w-full">
            {menu.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={`item-menu-${item.id}`}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  {...(item.comingSoon && { "data-tip": "Coming soon!" })}
                  onClick={() => {
                    if (!item.comingSoon) {
                      //   dispatch(setCurrentPath("/"));
                      setTimeout(() => navigate(item.href || "/"), 0);
                    }
                  }}
                  className={`flex gap-4 py-3 px-8  cursor-pointer transition-all duration-100 ${
                    item.id === hover || item.id === active
                      ? "bg-sky-100/70 text-sky-600"
                      : "text-slate-400"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <p className="">{item.title}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <span className="h-[2px] w-[70%] block bg-slate-50 my-4 mx-auto" />

        <div className="text-[0.7rem] text-center absolute bottom-8 w-full text-slate-400 flex gap-1 justify-center">
          All rights Reserved. <SwissIcon className="w-3 h-3" />
          Swiss Made
        </div>
      </div>
    );
  }
);

Sidebar.displayName = "Sidebar";
export default Sidebar;
