import { useState, useEffect } from "react";
import axios from "axios";
import {
  donemGetir,
  formatTarih,
  formatLocaleString,
  calculateEndAktifRatio,
} from "../../utils/dataFunctions";
import { Button, Modal } from "antd";
const url =
  "http://10.0.0.101:8088/Makel/OsosApi/Sayac/SayacAyGecisEndeks/01.01.2024/03.11.2024";
const LoadAnalysisPage = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div style={{ color: "white", overflowY: "auto" }}>
      <h2>Sayac Endeksleri</h2>
      <Button type="primary" onClick={showModal}>
        Filtre
      </Button>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
        ]}
      ></Modal>
      <table>
        <thead>
          <tr>
            <th>Seri No</th>
            <th>Sayac Adi</th>
            <th>Tarih</th>
            <th>Aktif (kWh) (1.8.0)</th>
            <th>Tarife 1 (kWh) (1.8.1)</th>
            <th>Tarife 2 (kWh) (1.8.2)</th>
            <th>Tarife 3 (kWh) (1.8.3)</th>
            <th>Enduktif (kVArh) (5.8.0)</th>
            <th>Kapasitif (kVArh) (8.8.0)</th>
            <th>End/Aktif (kVArh) (%)</th>
            <th>Kap/Aktif (kVArh) (%)</th>
            <th>Donem </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) =>
            item.sayacGecmisEndeks?.map((endeks, subIndex) => (
              <tr key={`${index}-${subIndex}`}>
                <td>{item.seriNo}</td>
                <td>{item.sayacAdi}</td>
                <td>{formatTarih(endeks.maxDemandTarih)}</td>
                <td>{formatLocaleString(endeks.aktif)}</td>
                <td>{formatLocaleString(endeks.tarife1)}</td>
                <td>{formatLocaleString(endeks.tarife2)}</td>
                <td>{formatLocaleString(endeks.tarife3)}</td>
                <td>{formatLocaleString(endeks.enduktif)}</td>
                <td>{formatLocaleString(endeks.kapasitif)}</td>
                <td>{calculateEndAktifRatio(endeks.enduktif, endeks.aktif)}</td>
                <td>
                  {calculateEndAktifRatio(endeks.kapasitif, endeks.aktif)}
                </td>
                <td>{donemGetir(endeks.donemAy, endeks.donemYil)} </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LoadAnalysisPage;
