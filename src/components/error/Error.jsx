import React from "react";
import styles from "./Error.module.css";
const Error = () => {
  return (
    <div className={styles["error-container"]}>
      <h1>404</h1>
      <p>Üzgünüz, aradığınız sayfa bulunamadı.</p>
      <p>
        Anasayfaya dönmek için <a href="/">buraya tıklayın</a>.
      </p>
    </div>
  );
};

export default Error;
