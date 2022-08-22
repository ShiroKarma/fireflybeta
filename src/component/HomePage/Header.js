import React, { useState } from "react";
import { FiCode, FiMenu, FiX } from "react-icons/fi";
import {DiCodeigniter} from 'react-icons/di'
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobilemenu = () => setClick(false);
  const navigate = useHistory();
  const goToAbout = (e) => {
    navigate.push("/about");};
  return (
    <div className="header">
      <div className="container">
        <div className="header-con">
          <div className="logo-container">
            <a href="#">
            <DiCodeigniter />Firefly    
            </a>
          </div>
          <ul className={click ? "menu active" : "menu"}>
            <li className="menu-link" onClick={closeMobilemenu}>
              <a onClick={goToAbout} href="#">
                ABOUT
              </a>
            </li>
            <li className="menu-link" onClick={closeMobilemenu}>
              <a href="#">Contact</a>
            </li>
            <li className="menu-link" onClick={closeMobilemenu}>
              <a href="#">Blog</a>
            </li>
          </ul>
          <div className="mobile-menu" onClick={handleClick}>
            {click ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;