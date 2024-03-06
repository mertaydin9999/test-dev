import React, { useCallback, useState } from "react";
import Menu from "devextreme-react/menu";
import service from "./data.js";
import { useNavigate } from "react-router-dom";

const products = service.getProducts();
const showSubmenuModes = [
  {
    name: "onHover",
    delay: { show: 0, hide: 500 },
  },
  {
    name: "onClick",
    delay: { show: 0, hide: 300 },
  },
];
const App = () => {
  const [showFirstSubmenuModes, setShowFirstSubmenuModes] = useState(
    showSubmenuModes[0]
  );

  const [hideSubmenuOnMouseLeave, setHideSubmenuOnMouseLeave] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();

  const itemClick = useCallback(
    (e) => {
      console.log(e);
      navigate(`${e.itemData.link}`);
    },
    [setCurrentProduct]
  );

  return (
    <div className="form">
      <div>
        <Menu
          dataSource={products}
          displayExpr="name"
          showFirstSubmenuMode={showFirstSubmenuModes}
          hideSubmenuOnMouseLeave={hideSubmenuOnMouseLeave}
          onItemClick={itemClick}
        />
      </div>
    </div>
  );
};
export default App;
