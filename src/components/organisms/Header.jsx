import { Branding } from "../molecules/Branding";
import { useState } from "react";
import { HeaderNav } from "../molecules/HeaderNav";
import { MenuIcon } from "../atoms/icons/MenuIcon";
import { CloseIcon } from "../atoms/icons/CloseIcon";
import "./Header.css";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const openSideMenu = () => {
    setOpenMenu(true);
    document.body.classList.add("noScrollPage");
    document.querySelector("html").classList.add("noScrollPage");
  };

  const closeSideMenu = () => {
    setOpenMenu(false);
    document.body.classList.remove("noScrollPage");
    document.querySelector("html").classList.remove("noScrollPage");
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <header className="header">
        <div className="headerSections">
          <Branding></Branding>
          <HeaderNav className="normalHeaderNav"></HeaderNav>
          <button className="mobileNavToggle open" onClick={openSideMenu}>
            <MenuIcon className="menuIcon" />
          </button>
        </div>
      </header>
      <div
        className={`containerHeaderNavMobile mobileVersion ${openMenu && "visible"}`}
        onClick={closeSideMenu}
      >
        <div className="sectionNavBar" onClick={stopPropagation}>
          <HeaderNav onClickOption={closeSideMenu}></HeaderNav>
          <button className="mobileNavToggle close" onClick={closeSideMenu}>
            <CloseIcon className="closeIcon" />
          </button>
        </div>
      </div>
    </>
  );
};
