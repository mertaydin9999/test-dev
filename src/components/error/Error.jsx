import React from "react";
import styles from "./Error.module.css";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className={styles["error-container"]}>
      <h1>404</h1>
      <p>Üzgünüz, aradığınız sayfa bulunamadı.</p>
      <p>
        Anasayfaya dönmek için
        <Link to="/">buraya tıklayın</Link>
      </p>
    </div>
  );
};

export default Error;
