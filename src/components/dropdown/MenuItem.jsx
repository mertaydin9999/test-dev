import React, { useState } from "react";
import styles from "./MenuItem.module.css";

const MenuItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={styles.menuItemContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href="#" className={styles.menuItem}>
        {item.label}
      </a>
      {item.children && isHovered && (
        <ul
          className={`${styles.subMenu} ${
            styles[item.children.length > 0 ? "visible" : "hidden"]
          }`}
        >
          {item.children.map((child, index) => (
            <li key={index}>
              <a href="#" className={styles.subMenuItem}>
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuItem;