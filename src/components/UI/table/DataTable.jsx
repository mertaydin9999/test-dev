import React, { useState, useEffect } from "react";
import { meterData } from "../../../data";
import styles from "./DataTable.module.css";
import Button from "../button/Button";
import axios from "axios";
const DataTable = () => {
  const [dataArray, setDataArray] = useState([]);

  // useEffect hook'unu kullanarak component yüklendiğinde API'den veri çekin
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Axios kullanarak API'den veriyi çekin
        const response = await axios.get(
          "http://10.0.0.101:8088/Makel/OsosApi/Sayac"
        );
        console.log(response);
        // Gelen veriyi state'e atın
        setDataArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Bu
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataArray.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // buradan sonrasi deneme
  const totalPages = Math.ceil(dataArray.length / itemsPerPage);
  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const getAdjacentPages = (currentPage, total, adjacent = 2) => {
    let pages = [];
    for (let i = currentPage - adjacent; i <= currentPage + adjacent; i++) {
      if (i > 0 && i <= total) {
        pages.push(i);
      }
    }
    return pages;
  };
  const renderPaginationButtons = () => {
    const adjacentPages = getAdjacentPages(currentPage, totalPages);
    return (
      <>
        <Button onClick={() => changePage(1)}>İlk</Button>
        <Button onClick={() => changePage(currentPage - 1)}>Önceki</Button>
        {adjacentPages.map((page) => (
          <Button
            key={page}
            onClick={() => changePage(page)}
            className={page === currentPage ? styles.activePageButton : ""}
          >
            {page}
          </Button>
        ))}
        <Button onClick={() => changePage(currentPage + 1)}>Sonraki</Button>
        <Button onClick={() => changePage(totalPages)}>Son</Button>
      </>
    );
  };
  return (
    <>
      <div className={styles["data-table-page-container"]}>
        <div className={styles["table-scroll"]}>
          <div className={styles["table-container-wrapper"]}>
            <table className={styles["table-container"]}>
              <thead>
                <tr>
                  <th>Uretici</th>
                  <th>Model</th>
                  <th>Sayac Adi</th>
                  <th>Seri No</th>
                  <th>Abone No</th>
                  <th>Tesisat No</th>
                  <th>Sayac Kodu</th>
                  <th>Carpan</th>
                  <th>Akim Trafo Orani</th>
                  <th>Cift Yon</th>
                  <th>Gerilim Trafo Orani</th>
                  <th>Birim</th>
                  <th>Yuk Profili Birim</th>
                  <th>Yuk Profili Kayit</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.sayacID}>
                    <td>{item.uretici}</td>
                    <td>{item.model}</td>
                    <td>{item.sayacAdi}</td>
                    <td>{item.seriNo}</td>
                    <td>{item.aboneNo}</td>
                    <td>{item.tesisatNo ? item.tesisatNo : "Yok"}</td>
                    <td>{item.sayacKodu ? item.sayacKodu : "Yok"}</td>
                    <td>{item.carpan}</td>
                    <td>{item.akimTrafoOrani ? item.akimTrafoOrani : "Yok"}</td>
                    <td>{item.ciftYonlu ? "Evet" : "Hayir"}</td>
                    <td>
                      {item.gerilimTrafoOrani ? item.gerilimTrafoOrani : "Yok"}
                    </td>
                    <td>{item.birim}</td>
                    <td>{item.yukProfiliBirim}</td>
                    <td>{item.yukProfiliKayit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.pages}>
          <p className={styles.pagenumbers}>
            Sayfa {currentPage} / {totalPages}{" "}
            <span>({dataArray.length} öğe)</span>
          </p>
          <div className={styles.buttons}>{renderPaginationButtons()}</div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
