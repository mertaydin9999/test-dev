import React, { useState, useEffect } from "react";
import { MdFactory } from "react-icons/md";
import { MdElectricMeter } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { MdShortText } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";
import { MdOutlinePlumbing } from "react-icons/md";
import { FaBarcode } from "react-icons/fa6";
import { TbMultiplier1X } from "react-icons/tb";
import { FaPercentage } from "react-icons/fa";
import { GrDirections } from "react-icons/gr";
import { FaWeight } from "react-icons/fa";
import { GoNote } from "react-icons/go";
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
import InputFilter from "../input/InputFilter";

const url = "http://10.0.0.101:8088/Makel/OsosApi/Sayac";

const DataTable = () => {
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
      <div className={styles["header-div"]}>
        <h2>Okunan Tum Endeks Bilgileri</h2>
      </div>
      <div className={styles["data-table-page-container"]}>
        <div className={styles["table-scroll"]}>
          <div className={styles["table-container-wrapper"]}>
            <table className={styles["table-container"]}>
              <thead>
                <tr>
                  <th>
                    Üretici <MdFactory />
                  </th>
                  <th>
                    Model <MdElectricMeter />
                  </th>
                  <th>
                    Sayaç Adı
                    <IoSpeedometer />
                  </th>
                  <th>
                    Seri No <MdShortText />
                  </th>
                  <th>
                    Abone No <BsPersonLinesFill />
                  </th>
                  <th>
                    Tesisat No <MdOutlinePlumbing />
                  </th>
                  <th>
                    Sayaç Kodu
                    <FaBarcode />
                  </th>
                  <th>
                    Çarpan <TbMultiplier1X />
                  </th>
                  <th>
                    Akım Trafo Oranı
                    <FaPercentage />
                  </th>
                  <th>
                    Çift Yön <GrDirections />
                  </th>
                  <th>
                    Gerilim Trafo Oranı
                    <FaPercentage />
                  </th>
                  <th>
                    Birim <FaWeight />
                  </th>
                  <th>
                    Yük Profili Birim <FaWeight />
                  </th>
                  <th>
                    Yük Profili Kayıt
                    <GoNote />
                  </th>
                </tr>
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
