import logo from "../../assets/logo.png";
const HeaderComponent = () => {
  return (
    <header>
      <div>
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={logo} width={"50%"} alt="" />
        </a>
      </div>
      <div>
        <h1 className="open-sans-h1">Makel Otomatik Sayac Okuma Sistemi</h1>
      </div>
    </header>
  );
};

export default HeaderComponent;
