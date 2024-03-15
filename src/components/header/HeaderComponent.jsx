import logo from "../../assets/logo.png";
import { useState } from "react";
import { MdAccountBox } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "antd";
const HeaderComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleMyAccount = () => {
    navigate("/my-account");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/login");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <header>
      <Modal
        title="Cikis"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            style={{
              backgroundColor: "#0A51AB",
              margin: "0px 20px 0 0px ",
              padding: "0em 2em",
            }}
            onClick={handleCancel}
          >
            Vazgec
          </Button>,
          <Button
            key="cancel"
            type="primary"
            style={{
              backgroundColor: "#e84749",
              margin: "0px 0px 0 0px ",
              padding: "0em 2em",
            }}
            onClick={handleOk}
          >
            Cikis
          </Button>,
        ]}
      >
        <p
          style={{
            color: "#f6f6f6",
            fontSize: "1em",
            fontWeight: 300,
          }}
        >
          Cikis yapmak istiyor musunuz?
        </p>
      </Modal>
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
          onClick={showModal}
        >
          <FiLogOut style={{ fontSize: "2em", backgroundColor: "" }} />
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
