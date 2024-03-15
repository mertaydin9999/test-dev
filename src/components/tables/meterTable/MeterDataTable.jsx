import React, { useState, useEffect } from "react";
import styles from "./DataTable.module.css";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import InputFilter from "../../UI/input/InputFilter";
import RenderPaginationButtons from "../../UI/pagination/Pagination";
import RenderMeterTableRows from "./RenderMeterTableRows";
import RenderMeterTableTh from "./RenderMeterTableTh";
import { pageHeader } from "../../../utils/dataFunctions";
import { useLocation } from "react-router-dom";
const DataTable = ({ url }) => {
  const [dataArray, setDataArray] = useState([]);
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
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const currentUrl = location.pathname;
  console.log(currentUrl);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const inputData = [
    { name: "uretici", placeholder: "Uretici", value: searchValues.uretici },
    { name: "model", placeholder: "Model", value: searchValues.model },
    {
      name: "sayacAdi",
      placeholder: "Sayac Adi",
      value: searchValues.sayacAdi,
    },
    { name: "seriNo", placeholder: "Seri No", value: searchValues.seriNo },
    { name: "aboneNo", placeholder: "Abone No", value: searchValues.aboneNo },
    {
      name: "tesisatNo",
      placeholder: "Tesisat No",
      value: searchValues.tesisatNo,
    },
    {
      name: "sayacKodu",
      placeholder: "Sayac Kodu",
      value: searchValues.sayacKodu,
    },
    { name: "carpan", placeholder: "Carpan", value: searchValues.carpan },
    {
      name: "akimTrafoOrani",
      placeholder: "Akim Trafo Orani",
      value: searchValues.akimTrafoOrani,
    },
    { name: "ciftYon", placeholder: "Cift Yon", value: searchValues.ciftYon },
    {
      name: "gerilimTrafoOrani",
      placeholder: "Gerilim Trafo Orani",
      value: searchValues.gerilimTrafoOrani,
    },
    { name: "birim", placeholder: "Birim", value: searchValues.birim },
    {
      name: "yukProfiliBirim",
      placeholder: "Yuk Profil Birim",
      value: searchValues.yukProfiliBirim,
    },
    {
      name: "yukProfiliKayit",
      placeholder: "Yuk Profili Kayit",
      value: searchValues.yukProfiliKayit,
    },
  ];

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSearchValues({
      ...searchValues,
      [name]: value,
    });
  };

  return (
    <>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      ) : (
        <>
          <div className={styles["header-div"]}>
            <h2>{pageHeader(currentUrl)}</h2>
          </div>
          <div className={styles["data-table-page-container"]}>
            <div className={styles["table-scroll"]}>
              <div className={styles["table-container-wrapper"]}>
                <table className={styles["table-container"]}>
                  <thead>
                    <RenderMeterTableTh />
                    <tr className={styles["flex-container"]}>
                      {inputData.map((item, index) => (
                        <th key={index}>
                          <InputFilter
                            type="text"
                            name={item.name}
                            placeholder={item.placeholder}
                            value={item.value}
                            onChange={handleInputChange}
                          />
                        </th>
                      ))}
                      {}
                    </tr>
                  </thead>
                  <tbody>
                    <RenderMeterTableRows currentItems={currentItems} />
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.pages}>
              <p className={styles.pagenumbers}>
                Sayfa {currentPage} / {totalPages}{" "}
                <span>({dataArray.length} öğe)</span>
              </p>
              <div className={styles.buttons}>
                <RenderPaginationButtons
                  getAdjacentPages={getAdjacentPages}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  changePage={changePage}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DataTable;
