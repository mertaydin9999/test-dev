import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HddOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import HeaderComponent from "../components/header/HeaderComponent";
const { Header, Content, Footer, Sider } = Layout;

const RootLayout = () => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Anasayfa", "/", <MailOutlined />, null, null),
    {
      type: "divider",
    },
    getItem("Kullanıcı", "2", <AppstoreOutlined />, [
      getItem("Kullanıcılar", "/users"),
      getItem("Müşteriler", "/customers"),
    ]),
    {
      type: "divider",
    },
    getItem("Sayac", "/meter", <SettingOutlined />),
    getItem("Sayac Endeksleri", "/all-read-indexes", <HddOutlined />),
  ];

  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(e.key);
    console.log("click ", e);
  };
  const [collapsed, setCollapsed] = useState(false);

  console.log(collapsed);
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#141414",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: "#0f2545" }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          items={items}
          onClick={onClick}
          style={{ backgroundColor: "#10305a" }}
        ></Menu>
      </Sider>
      <Layout
        style={{
          padding: 0,
          backgroundColor: "#111b2b",
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
        <Content
          style={{
            backgroundColor: "",
          }}
        >
          <Outlet />;
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
