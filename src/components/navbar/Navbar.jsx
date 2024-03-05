import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Anasayfa</Link>
        </li>
        <li>
          <Link to="/products">Kullanici</Link>
        </li>
        <li>
          <Link to="/">Tesisat Semasi</Link>
        </li>
        <li>
          <Link to="/products">Okumalar</Link>
        </li>
        <li>
          <Link to="/">Raporlar</Link>
        </li>
        <li>
          <Link to="/products">Modem Islemleri</Link>
        </li>
        <li>
          <Link to="/">Uyari Mesajlari</Link>
        </li>
        <li>
          <Link to="/products">Hesabim</Link>
        </li>
        <li>
          <Link to="/products">Cikis</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
