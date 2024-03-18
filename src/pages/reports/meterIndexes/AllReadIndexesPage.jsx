import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AllReadIndexesPage.module.css";
import { FaFilter } from "react-icons/fa";
import { FaFileExport } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { Button, Modal, Spin } from "antd";
import RenderPaginationButtons from "../../../components/UI/pagination/Pagination";
import { filterDataByDateRange } from "../../../utils/dataFunctions";
import InputFilter from "../../../components/UI/table/InputFilter";
import RenderTableRows from "../../../components/UI/table/RenderTableRows";
import ButtonInput from "../../../components/UI/button/ButtonInput";
import { useLocation } from "react-router-dom";
import { pageHeader } from "../../../utils/dataFunctions";
import TableHead from "../../../components/UI/table/TableHead";
import LoadingSpinner from "../../../components/UI/spinner/LoadingSpinner";
const baseUrl = "http://10.0.0.101:8088/Makel/OsosApi/Sayac/SayacAyGecisEndeks";

const tableHead = [
  "Seri No",
  "Sayac Adi",
  "Tarih",
  "Aktif (kWh) (1.8.0)",
  "Tarife 1 (kWh) (1.8.1)",
  "Tarife 2 (kWh) (1.8.2)",
  "Tarife 3 (kWh) (1.8.3)",
  "Enduktif (kVArh) (5.8.0)",
  "Kapasitif (kVArh) (8.8.0)",
  "End/Aktif (kVArh) (%)",
  "Kap/Aktif (kVArh) (%)",
  "Donem ",
];

const AllReadIndexesPage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataArray, setDataArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("01.01.2024");
  const [endDate, setEndDate] = useState("01.15.2024");

  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const location = useLocation();
  const currentUrl = location.pathname;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/01.01.2023/03.15.2024`);
        setDataArray(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(startDate, endDate);
  }, [startDate, endDate]);
  const mapToSeparateArray = (data) => {
    const separateArray = [];
    let keyIndex = 0; // Key için başlangıç indeksi

    data.forEach((item) => {
      const { sayacAdi, sayacGecmisEndeks, ...rest } = item;
      sayacGecmisEndeks.forEach((endeks) => {
        separateArray.push({
          key: keyIndex++, // Her öğe için artan bir key değeri atanıyor
          sayacAdi,
          ...rest,
          ...endeks,
        });
      });
    });

    return separateArray;
  };
  useEffect(() => {
    setFilteredData(dataArray); // İlk başta veriyi doldur
  }, [dataArray]);
  useEffect(() => {
    const filteredData = filterDataByDateRange(
      dataArray,
      startDate,
      endDate,
      selectedRows
    );
    setFilteredData(filteredData);
  }, [dataArray, startDate, endDate]);

  const separateArray = mapToSeparateArray(dataArray);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setStartDate(selectedDateRange[0]);
    setEndDate(selectedDateRange[1]);
    setFilteredData(selectedRows);
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/${startDate}/${endDate}`);
      setDataArray(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const handleCancel = () => {
    setSelectedDateRange([]);
    setOpen(false);
  };
  const handleFilterChange = (filteredData, dateRange) => {
    setSelectedDateRange(dateRange);
    setSelectedRows(filteredData);
  };
  console.log(selectedDateRange, selectedRows);
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={styles["header-div"]}>
            <h2>{pageHeader(currentUrl)}</h2>
          </div>
          <Modal
            open={open}
            title="Filtreleme Ekrani"
            onOk={handleOk}
            onCancel={handleCancel}
            width={1200}
            footer={[
              <Button
                key="cancel"
                type="primary"
                style={{
                  backgroundColor: "#e84749",
                  margin: "20px 20px 0 0px ",
                  padding: "0em 5em",
                }}
                loading={loading}
                onClick={handleCancel}
              >
                Vazgec
              </Button>,
              <Button
                key="submit"
                type="primary"
                style={{
                  backgroundColor: "#0A51AB",
                  margin: "0 0px 0 0px ",
                  padding: "0em 5em",
                }}
                loading={loading}
                onClick={handleOk}
              >
                Filtrele
              </Button>,
            ]}
          >
            <InputFilter
              dataSource={separateArray}
              onFilterChange={handleFilterChange}
            />
          </Modal>
          <div
            style={{ color: "white", overflowY: "auto" }}
            className={styles["data-table-page-container"]}
          >
            <div className={styles["table-scroll"]}>
              <div className={styles["table-container-wrapper"]}>
                <div className={styles["filter-buttons"]}>
                  <ButtonInput onClick={showModal}>
                    <FaFilter />
                    Filtrele
                  </ButtonInput>
                  <ButtonInput>
                    <FaFileExport />
                    Cikart
                  </ButtonInput>
                  <ButtonInput>
                    <FaListAlt />
                    Sutunlari Goster
                  </ButtonInput>
                </div>
                <table className={styles["table-container"]}>
                  <thead>
                    <TableHead tableHead={tableHead} />
                  </thead>
                  <tbody>
                    <RenderTableRows currentItems={currentItems} />
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.pages}>
              <p className={styles.pagenumbers}>
                Sayfa {currentPage} / {totalPages}{" "}
                <span>
                  ({(filteredData ? filteredData : dataArray).length} öğe)
                </span>
              </p>
              <div className={styles.buttons}>
                {
                  <RenderPaginationButtons
                    currentPage={currentPage}
                    totalPages={totalPages}
                    changePage={changePage}
                  />
                }
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllReadIndexesPage;
