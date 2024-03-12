import React, { useState, useEffect } from "react";

import styles from "./DataTable.module.css";
import ButtonInput from "../button/ButtonInput";
import axios from "axios";
import {
  SearchOutlined,
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
const url = "http://10.0.0.101:8088/Makel/OsosApi/Sayac";
const DataTable = () => {
  const [dataArray, setDataArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValues, setSearchValues] = useState({
    uretici: "",
    model: "",
    sayacAdi: "",
    seriNo: "",
    aboneNo: "",
    tesisatNo: "",
    sayacKodu: "",
    carpan: "",
    akimTrafoOrani: "",
    ciftYon: "",
    gerilimTrafoOrani: "",
    birim: "",
    yukProfiliBirim: "",
    yukProfiliKayit: "",
  });
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
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
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
        <ButtonInput onClick={() => changePage(1)}>İlk</ButtonInput>
        <ButtonInput onClick={() => changePage(currentPage - 1)}>
          Önceki
        </ButtonInput>
        {adjacentPages.map((page) => (
          <ButtonInput
            key={page}
            onClick={() => changePage(page)}
            className={page === currentPage ? styles.activePageButton : ""}
          >
            {page}
          </ButtonInput>
        ))}
        <ButtonInput onClick={() => changePage(currentPage + 1)}>
          Sonraki
        </ButtonInput>
        <ButtonInput onClick={() => changePage(totalPages)}>Son</ButtonInput>
      </>
    );
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSearchValues({
      ...searchValues,
      [name]: value,
    });
  };

  useEffect(() => {
    const filtered = dataArray.filter((item) => {
      for (let key in searchValues) {
        const searchValue = searchValues[key].toLowerCase();
        const itemValue = item[key] ? item[key].toString().toLowerCase() : ""; // Eğer item[key] null ise, boş bir string olarak kabul edilir
        if (searchValue && !itemValue.startsWith(searchValue)) {
          return false;
        }
      }
      return true;
    });
    setFilteredData(filtered);
  }, [searchValues]);

  return (
    <>
      <div>
        <h3>Sayac </h3>
      </div>
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
                <tr className={styles["flex-container"]}>
                  <th>
                    <input
                      type="text"
                      name="uretici"
                      placeholder="Uretici"
                      value={searchValues.uretici}
                      onChange={handleInputChange}
                    />
                    <SearchOutlined />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="model"
                      placeholder="Model"
                      value={searchValues.model}
                      onChange={handleInputChange}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="sayacAdi"
                      placeholder="Sayac Adi"
                      value={searchValues.sayacAdi}
                      onChange={handleInputChange}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="seriNo"
                      placeholder="Seri No"
                      value={searchValues.seriNo}
                      onChange={handleInputChange}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="aboneNo"
                      placeholder="Abone No"
                      value={searchValues.aboneNo}
                      onChange={handleInputChange}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="tesisatNo"
                      placeholder="Tesisat No"
                      value={searchValues.tesisatNo}
                      onChange={handleInputChange}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="sayacKodu"
                      placeholder="Sayac Kodu"
                      value={searchValues.sayacKodu}
                      onChange={handleInputChange}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="carpan"
                      placeholder="Carpan"
                      value={searchValues.carpan}
                      onChange={handleInputChange}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="akimTrafoOrani"
                      placeholder="Akim Trafo Orani"
                      value={searchValues.akimTrafoOrani}
                      onChange={handleInputChange}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="ciftYon"
                      placeholder="Cift Yon"
                      value={searchValues.ciftYon}
                      onChange={handleInputChange}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="gerilimTrafoOrani"
                      placeholder="Gerilim Trafo Orani"
                      value={searchValues.gerilimTrafoOrani}
                      onChange={handleInputChange}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="birim"
                      placeholder="Birim"
                      value={searchValues.birim}
                      onChange={handleInputChange}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="yukProfilBirim"
                      placeholder="Yuk Profil Birim"
                      value={searchValues.yukProfilBirim}
                      onChange={handleInputChange}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="yukProfiliKayit"
                      placeholder="Yuk Profili Kayit"
                      value={searchValues.yukProfiliKayit}
                      onChange={handleInputChange}
                    />
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((item, index) => (
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
                    <td>
                      {item.gerilimTrafoOrani ? item.gerilimTrafoOrani : "Yok"}
                    </td>
                    <td>{item.birim}</td>
                    <td>{item.yukProfiliBirim}</td>
                    <td>{item.yukProfiliKayit}</td>
                  </tr>
                ))}
                {loading && ( // Loading durumunda spinner'ı göster
                  <div className={styles.loadingSpinner}>
                    <Spin
                      indicator={
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                      }
                    />
                  </div>
                )}
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
