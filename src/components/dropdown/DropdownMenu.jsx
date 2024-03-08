import React, { useState } from "react";
import DataTable from "../UI/table/DataTable";
import { useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import HeaderComponent from "../header/HeaderComponent";
const { Header, Content, Footer, Sider } = Layout;
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
  getItem("Sayac Endeksleri", "/all-read-indexes"),
];

const DropdownMenu = () => {
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
          <DataTable />
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
            display: "fixed",
          }}
        >
          Copyright {new Date().getFullYear()} MAKEL - (4.64) - www.makel.com.tr
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default DropdownMenu;
