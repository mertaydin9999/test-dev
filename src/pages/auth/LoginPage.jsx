import React from "react";
import Login from "../../components/auths/login/Login";

const LoginPage = ({ handleLogin, user }) => {
  return <Login handleLogin={handleLogin} user={user} />;
};

export default LoginPage;
