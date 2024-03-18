import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingSpinner = ({ className }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className={className} style={{ textAlign: "center", margin: "2em 0" }}>
      <Spin indicator={antIcon} />
    </div>
  );
};

export default LoadingSpinner;
