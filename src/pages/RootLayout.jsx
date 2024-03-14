import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdCable } from "react-icons/md";
import { FaTableCells } from "react-icons/fa6";
import { IoIosStats } from "react-icons/io";
import { BsFillModemFill } from "react-icons/bs";
import { MdSystemSecurityUpdateWarning } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";

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
    getItem(
      "Anasayfa",
      "/",
      <FaHome style={{ fontSize: "1.7em" }} />,
      null,
      null
    ),
    {
      type: "divider",
    },
    getItem(
      "Kullanıcı",
      "2",
      <MdPersonSearch style={{ fontSize: "1.7em" }} />,
      [getItem("Kullanıcılar", "/users"), getItem("Müşteriler", "/customers")]
    ),
    {
      type: "divider",
    },
    getItem("Tesisat Semasi", "3", <MdCable style={{ fontSize: "1.7em" }} />, [
      getItem("Lokasyon", "/location"),
      getItem("Sayac", "/meterj"),
      getItem("Haberlesme Unitesi", "/communication-unit"),
    ]),
    getItem("Okumalar", "4", <FaTableCells style={{ fontSize: "1.7em" }} />, [
      getItem("Yeni Okuma", "/new-reading"),
      getItem("Guncel Okumalar", "/latest-readings"),
      getItem("Okuma Sonuclari", "/reading-results"),
      getItem("Haberlesme Loglari", "/communication-logs"),
    ]),
    getItem(
      "Istatistikler",
      "5",
      <IoIosStats style={{ fontSize: "1.7em" }} />,
      [
        getItem("Okuma Basari Oranlari", "/lreading-success-rates"),
        getItem("Modem Sinyal Seviyeleri", "/modem-signal-levels"),
        getItem("Ay Endeksi Bulunmayan Sayaclar", "/meters-without-transition"),
      ]
    ),
    getItem(
      "Modem Islemleri",
      "6",
      <BsFillModemFill style={{ fontSize: "1.7em" }} />,
      [
        getItem("Paket Guncelleme", "/packages-update"),
        getItem("Modem Parametreleri", "/modem-parameter"),
        getItem("Modem Is Emri Yukleme", "/loading-modem-command-job"),
      ]
    ),
    getItem(
      "Uyari Mesajlari",
      "/warning-message",
      <MdSystemSecurityUpdateWarning style={{ fontSize: "1.7em" }} />
    ),
    getItem("Raporlar", "7", <TbReportSearch style={{ fontSize: "1.7em" }} />, [
      getItem("Sayac Endeksleri", "8", null, [
        getItem("Okunan Tum Endeksler", "/all-read-indexes"),
        getItem("Ay Sonu Endeksleri", "/end-of-month-indexes"),
        getItem("Ay Sonu Tuketimleri", "/month-end-consumptions"),
        getItem("Son Endeks Bilgileri", "/last-index-infos"),
        getItem("Yuk Profili Kayitlari", "/load-profile-records"),
      ]),
      getItem("Sebekeye Verilen Endeksler", "9", null, [
        getItem("Okunan Tum Endeksler - Uretim", "/all-read-indexes-product"),
        getItem("Ay Sonu Endeksleri - Uretim", "/end-of-month-indexes-product"),
        getItem(
          "Ay Sonu Tuketimleri - Uretim",
          "/month-end-consumptions-product"
        ),
        getItem("Son Endeks Bilgileri - Uretim", "/last-index-infos-product"),
        getItem(
          "Yuk Profili Kayitlari - Uretim",
          "/load-profile-records-product"
        ),
      ]),
      getItem("Sayac Hatalari", "10", null, [
        getItem("Faz Hatalari", "/phase-errors"),
        getItem("Klemens Kapagi Uyarilari", "/klemens-cover-warnings"),
        getItem("Hata Ve Uyari Sayaclari", "/error-and-warning-meter"),
        getItem(
          "Pil Durumu Ve Govde Kapagi Uyarilari",
          "/battery-status-and-chassis-cover-warnings"
        ),
      ]),
      getItem("Zaman Farklari", "11", null, [
        getItem("Sayac Saat Degerleri", "/meter-clock-values"),
      ]),
      getItem("Akim Gerilim Bilgileri", "/current-and-voltage-info"),
      getItem("Load Analysis", "/load-analysis"),
      getItem("Modem Sayisal Giris Loglari", "/modem-digital-input-logs"),
      getItem("Veri Cikart", "12", null, [
        getItem("Toplu OSF Formu", "/mass-osf-form"),
        getItem("CSV Ciktisi", "/csv-output"),
      ]),
      getItem("DST Iptal Edilen Sayaclar", "/dst-cancelled-meters"),
    ]),

    getItem(
      "Sayac",
      "/meter",
      <FaTachometerAlt style={{ fontSize: "1.7em" }} />
    ),
    getItem(
      "Sayac Endeksleri",
      "/all-read-indexess ",
      <FaListAlt style={{ fontSize: "1.7em" }} />
    ),
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
