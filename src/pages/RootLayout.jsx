import { Outlet } from "react-router-dom";
import Header from "../components/header/HeaderComponent";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import DropdownMenu from "../components/dropdown/DropdownMenu";

const RootLayout = () => {
  return (
    <>
      <DropdownMenu />
      <Outlet />
    </>
  );
};

export default RootLayout;
