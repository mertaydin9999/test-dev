import logo from "../../assets/logo.png";
import { MdAccountBox } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  const handleMyAccount = () => {
    navigate("/my-account");
  };
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 className="open-sans-h1">Makel Otomatik Sayac Okuma Sistemi</h1>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0em 1em",
        }}
      >
        <div
          className="my-account-icon"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0em 1em",
          }}
          onClick={handleMyAccount}
        >
          <MdAccountBox style={{ fontSize: "2.3em", backgroundColor: "" }} />
        </div>
        <div
          className="logout-icon"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0em 1em",
          }}
          onClick={handleLogout}
        >
          <FiLogOut style={{ fontSize: "2em", backgroundColor: "" }} />
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
