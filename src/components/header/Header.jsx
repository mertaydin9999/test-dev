import logo from "../../assets/logo.png";
const Header = () => {
  return (
    <header>
      <div>
        <a href="#">
          <img src={logo} alt="" />
        </a>
      </div>
      <div>
        <h1 className="open-sans-h1">Makel Otomatik Sayac Okuma Sistemi</h1>
      </div>
    </header>
  );
};

export default Header;
