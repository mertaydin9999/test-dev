import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import { pageHeader } from "../../utils/dataFunctions";
import { useLocation } from "react-router-dom";
import styles from "./MyAccountPage.module.css";
import makelPhoto from "../../assets/logo.png";
const normFile = (e) => {
  console.log(e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const dummyArray = {
  charge: "ADMIN",
  name: "Makel",
  surname: "Makeloglu",
  phoneNumber: "0536 994 66 76",
  email: "makel@makel.com.tr",
  password: "123456",
  photo: "dummy",
};
const MyAccountPage = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const currentUrl = location.pathname;
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <div className={styles["header-div"]}>
        <h2>{pageHeader(currentUrl)}</h2>
      </div>
      <div
        style={{
          display: "flex",
          gap: "0em 1em",
          padding: "1em",
        }}
      >
        <div
          style={{
            backgroundColor: "#10305A",
            padding: "2em",
            width: "60%",
            borderRadius: ".5em",
          }}
        >
          <Form
            form={form}
            onFinish={onFinish}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 20,
            }}
            layout="horizontal"
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item label="Ad">
              <Input style={{ color: "black" }} />
            </Form.Item>
            <Form.Item label="Soyad">
              <Input style={{ color: "black" }} />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Telefon No"
              rules={[
                {
                  required: true,
                  message: "Lutfen telefon numaranizi giriniz!",
                },
              ]}
            >
              <Input style={{ color: "black" }} />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "Lutfen gecerli bir e-mail adresi giriniz!",
                },
                {
                  required: true,
                  message: "Lutfen e-mail adresinizi giriniz!",
                },
              ]}
            >
              <Input style={{ color: "black" }} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Parola"
              rules={[
                {
                  required: true,
                  message: "Lutfen sifrenizi giriniz!",
                },
              ]}
              hasFeedback
            >
              <Input.Password style={{ color: "black" }} />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Parola (Tekrar)"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Lutfen parolanizi dogrulayiniz!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Parolalar eslesmiyor!"));
                  },
                }),
              ]}
            >
              <Input.Password style={{ color: "black" }} />
            </Form.Item>
            <Form.Item
              label="Dosya Sec"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              name="file"
            >
              <Upload listType="picture-card">
                <button
                  style={{
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Dosya
                  </div>
                </button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                style={{
                  backgroundColor: "green",
                  width: "80%",
                  marginLeft: "14.2em",
                }}
                htmlType="submit"
              >
                Guncelle
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles["user-infos-div"]}>
          <div className={styles["my-account-info-div"]}>
            <p>Yetkisi: Makel {dummyArray.charge}</p>
            <p>Ad : {dummyArray.name}</p>
            <p>Soyad : {dummyArray.surname}</p>
            <p> Telefon: {dummyArray.phoneNumber}</p>
            <p>E-Mail : {dummyArray.email}</p>
            <p>Sifre : {dummyArray.password}</p>
          </div>
          <div className={styles["my-account-photo-div"]}>
            <img src={makelPhoto} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccountPage;
