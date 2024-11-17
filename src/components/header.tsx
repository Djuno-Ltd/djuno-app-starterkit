import React, { useCallback, useState } from "react";
import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";
import { ReactComponent as Logo } from "../assets/icons/logo.svg";
import { ReactComponent as TextLogo } from "../assets/icons/logo-text.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import IconButton from "./iconButton";
import SearchInput from "./searchInput";
import WalletDropdown from "./walletDropdown";
import useWindowOnClick from "../hooks/useWindowOnClick";
import { Link } from "react-router-dom";

export type HeaderProps = {
  withoutSearch?: boolean;
  withLogo?: boolean;
  onShowNav?: () => void;
  onHideNav?: () => void;
  renderSearchInput?: () => React.ReactNode;
  showSearch?: boolean;
};

function Header({
  withoutSearch,
  withLogo,
  onShowNav,
  onHideNav,
  renderSearchInput,
}: HeaderProps) {
  const [openMobileSearch, setOpenMobileSearch] = useState(false);

  useWindowOnClick(
    () => {
      if (onHideNav) onHideNav();
    },
    [],
    { capture: true }
  );

  useWindowOnClick(() => {
    setOpenMobileSearch(false);
  }, []);

  const handleClickMobileSearchBtn: React.MouseEventHandler<HTMLDivElement> =
    useCallback((e) => {
      e.stopPropagation();
      setOpenMobileSearch(true);
    }, []);

  return (
    <div className="w-full h-[72px] border-b-2 border-slate-100 flex items-center p-0 px-8 relative z-20">
      <div className="flex lg:hidden items-center gap-2">
        <IconButton primary={true} onClickCapture={onShowNav}>
          <MenuIcon className="w-9 h-9" />
        </IconButton>
        <Logo className="w-8" />
      </div>
      {withLogo && (
        <Link to="/" className="flex items-center gap-1">
          <TextLogo className="w-16 hidden lg:block" />
          <span className="Nothing-font font-semibold text-lg">sign</span>
        </Link>
      )}
      {!withoutSearch && (
        <>
          <div
            className="flex items-center absolute lg:static h-[70px] lg:h-auto bg-white -top-[70px] bottom-0 left-0 right-0 z-10 transition-all duration-200 lg:w-full"
            onClick={(e) => e.stopPropagation()}
            style={{
              top: openMobileSearch ? 0 : -70,
            }}
          >
            {renderSearchInput ? renderSearchInput() : <SearchInput />}
          </div>
        </>
      )}

      <WalletDropdown />
      {!withoutSearch && (
        <div className="ml-2 lg:hidden">
          <IconButton onClick={handleClickMobileSearchBtn}>
            <SearchIcon className="w-8 h-8" />
          </IconButton>
        </div>
      )}

      {/* <div
        className={`${
          open ? "h-[400px] shadow-xl shadow-slate-100" : ""
        } h-0 bg-white absolute w-full top-[70px] left-0 z-30 transition-all duration-500 border-b-2 border-slate-100`}
      ></div> */}
    </div>
  );
}

export default Header;
