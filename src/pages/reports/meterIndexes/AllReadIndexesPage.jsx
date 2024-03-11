import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AllReadIndexesPage.module.css";
import {
  donemGetir,
  formatTarih,
  formatLocaleString,
  calculateEndAktifRatio,
} from "../../../utils/dataFunctions";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Modal, Spin } from "antd";
const url =
  "http://10.0.0.101:8088/Makel/OsosApi/Sayac/SayacAyGecisEndeks/01.01.2024/03.11.2024";
const AllReadIndexesPage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataArray, setDataArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  // const [searchValues, setSearchValues] = useState({
  //   sayacAdi: "",
  //   seriNo: "",
  //   maxDemandTarih: "",
  //   aktif: "",
  //   tarife1: "",
  //   tarife2: "",
  //   tarife3: "",
  //   enduktif: "",
  //   kapasitif: "",
  //   donemAy: "",
  //   donemYil: "",
  // });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setDataArray(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   setSearchValues({
  //     ...searchValues,
  //     [name]: value,
  //   });
  // };
  // useEffect(() => {
  //   const filtered = dataArray.filter((item) => {
  //     for (let key in searchValues) {
  //       const searchValue = searchValues[key].toLowerCase();
  //       const itemValue = item[key] ? item[key].toString().toLowerCase() : ""; // Eğer item[key] null ise, boş bir string olarak kabul edilir
  //       if (searchValue && !itemValue.startsWith(searchValue)) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   });
  //   setFilteredData(filtered);
  // }, [searchValues]);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataArray.length / itemsPerPage);
  console.log(currentItems);
  return (
    <div
      style={{ color: "white", overflowY: "auto" }}
      className={styles["data-table-page-container"]}
    >
      <h2>Sayac Endeksleri</h2>
      <div className={styles["table-scroll"]}>
        <div className={styles["table-container-wrapper"]}>
          <table className={styles["table-container"]}>
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
              {currentItems.map((item, index) =>
                item.sayacGecmisEndeks?.map((endeks, subIndex) => (
                  <tr key={`${index}-${subIndex}`}>
                    <td>{item.seriNo}</td>
                    <td>{item.sayacAdi}</td>
                    <td>{formatTarih(endeks?.maxDemandTarih)}</td>
                    <td>{formatLocaleString(endeks?.aktif)}</td>
                    <td>{formatLocaleString(endeks?.tarife1)}</td>
                    <td>{formatLocaleString(endeks?.tarife2)}</td>
                    <td>{formatLocaleString(endeks?.tarife3)}</td>
                    <td>{formatLocaleString(endeks?.enduktif)}</td>
                    <td>{formatLocaleString(endeks?.kapasitif)}</td>
                    <td>
                      {calculateEndAktifRatio(endeks?.enduktif, endeks?.aktif)}
                    </td>
                    <td>
                      {calculateEndAktifRatio(endeks?.kapasitif, endeks?.aktif)}
                    </td>
                    <td>{donemGetir(endeks?.donemAy, endeks?.donemYil)} </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {loading && ( // Loading durumunda spinner'ı göster
            <div className={styles.loadingSpinner}>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            </div>
          )}
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
  );
};

export default AllReadIndexesPage;
