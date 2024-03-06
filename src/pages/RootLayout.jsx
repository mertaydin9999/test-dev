import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Dropdown from "../components/dropdown/Dropdown";
const menuItems = [
  {
    label: "Anasayfa",
    link: "/anasayfa",
  },
  {
    label: "Hizmetler",
    link: "/hizmetler",
    children: [
      {
        label: "Web Geliştirme",
        link: "/hizmetler/web-gelistirme",
      },
      {
        label: "Mobil Uygulama Geliştirme",
        link: "/hizmetler/mobil-uygulama-gelistirme",
      },
      {
        label: "Veritabanı Yönetimi",
        link: "/hizmetler/veritabani-yonetimi",
      },
    ],
  },
  {
    label: "Hizmetler",
    link: "/hizmetler",
    children: [
      {
        label: "Web Geliştirme",
        link: "/hizmetler/web-gelistirme",
      },
      {
        label: "Mobil Uygulama Geliştirme",
        link: "/hizmetler/mobil-uygulama-gelistirme",
      },
      {
        label: "Veritabanı Yönetimi",
        link: "/hizmetler/veritabani-yonetimi",
      },
    ],
  },
  {
    label: "Hakkımızda",
    link: "/hakkimizda",
  },
  {
    label: "İletişim",
    link: "/iletisim",
  },
];

const RootLayout = () => {
  return (
    <>
      <Header />
      <Dropdown menuItems={menuItems} />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
