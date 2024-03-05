import { Outlet } from "react-router-dom";
import Header from "../src/components/header/Header";
import Navbar from "../src/components/navbar/Navbar";
import Footer from "../src/components/footer/Footer";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
