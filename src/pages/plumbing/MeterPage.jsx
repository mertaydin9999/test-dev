import React, { useState, useEffect } from "react";
import axios from "axios";

const MeterPage = () => {
  const [veri, setVeri] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.0.101:8088/Makel/OsosApi/Sayac"
        );
        setVeri(response.data);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        {veri ? (
          <div>
            <h2>Alınan Veri:</h2>
            <pre>{JSON.stringify(veri, null, 2)}</pre>
          </div>
        ) : (
          <p>Veri yükleniyor...</p>
        )}
      </div>
    </>
  );
};

export default MeterPage;
