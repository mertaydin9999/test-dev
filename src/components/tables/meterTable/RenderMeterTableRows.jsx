import React from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
const RenderMeterTableRows = ({ currentItems }) => {
  return currentItems.map((item, index) => (
    <tr key={index}>
      <td>{item.uretici}</td>
      <td>{item.model}</td>
      <td>{item.sayacAdi}</td>
      <td>{item.seriNo}</td>
      <td>{item.aboneNo}</td>
      <td>{item.tesisatNo ? item.tesisatNo : "Yok"}</td>
      <td>{item.sayacKodu ? item.sayacKodu : "Yok"}</td>
      <td>{item.carpan}</td>
      <td>{item.akimTrafoOrani ? item.akimTrafoOrani : "Yok"}</td>
      <td>
        {item.ciftYonlu ? (
          <CheckOutlined style={{ color: "#6abe39" }} />
        ) : (
          <CloseOutlined style={{ color: "#e84749" }} />
        )}
      </td>
      <td>{item.gerilimTrafoOrani ? item.gerilimTrafoOrani : "Yok"}</td>
      <td>{item.birim}</td>
      <td>{item.yukProfiliBirim}</td>
      <td>{item.yukProfiliKayit}</td>
    </tr>
  ));
};

export default RenderMeterTableRows;
