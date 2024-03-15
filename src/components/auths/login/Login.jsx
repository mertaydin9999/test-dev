import styles from "./Login.module.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import makelPhoto from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
const Login = ({ handleLogin, user }) => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    if (
      values.username === user.username &&
      values.password === user.password
    ) {
      handleLogin(true);
      navigate("/");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles["login-wrapper"]}>
      <div className={styles["login-form-div"]}>
        <div className={styles["logo-photo-div"]}>
          <img src={makelPhoto} alt="" />
        </div>
        <div>
          <p
            style={{
              color: "black",
            }}
          >
            Giris Paneli
          </p>
        </div>
        <Form
          name="normal_login"
          className={styles["login-form"]}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{
            width: "60%",
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Lutfen kullanici adinizi giriniz!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Kullanici Adi"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Lutfen sifrenizi giriniz!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Sifre"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                backgroundColor: "red",
                fontSize: "1em",
              }}
              className={styles["login-form-button"]}
            >
              Giris
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
