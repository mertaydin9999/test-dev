import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider
    theme={{
      cssVar: true,
      hashed: false,
      components: {
        Table: {
          colorBgContainer: "#0F2545",
          colorText: "#f6f6f6",
          headerBg: "#15417E",
          headerColor: "#f6f6f6",
          borderColor: "#10305A",
          filterDropdownBg: "#fff",
          rowHoverBg: "#375885",
          rowSelectedBg: "#375885",
          rowSelectedHoverBg: "#0a51ab",
        },
        Modal: {
          contentBg: "#111A2C",
          headerBg: "transparent",
          titleColor: "#f6f6f6",
          titleFontSize: 32,
        },
        Pagination: {
          colorBgContainer: "#f6f6f6",
          itemActiveBg: "#0F2545",
        },
      },
    }}
  >
    <App />
  </ConfigProvider>
);
