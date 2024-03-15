import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import { Layout } from "antd";
import HeaderComponent from "../components/header/HeaderComponent";
import MenuComponent from "../components/navbar/MenuComponent";
const { Header, Content, Footer, Sider } = Layout;

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#fff",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: "#0f2545" }}
      >
        <div className="demo-logo-vertical" />
        <MenuComponent />
      </Sider>
      <Layout
        style={{
          background: "#111a2c",
        }}
      >
        <Header
          style={{
            margin: 0,
            background: "#0f2545",
            width: "100%",
            display: "fixed !important",
          }}
        >
          <HeaderComponent />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
