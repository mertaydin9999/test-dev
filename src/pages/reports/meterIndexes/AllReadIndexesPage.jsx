import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AllReadIndexesPage.module.css";
import ButtonInput from "../../../components/UI/button/ButtonInput";
import {
  donemGetir,
  formatTarih,
  formatLocaleString,
  calculateEndAktifRatio,
} from "../../../utils/dataFunctions";
import {
  LoadingOutlined,
  ControlOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Button, Modal, Spin, Table } from "antd";
import FilterTable from "../../../components/UI/table/FilterTable";
import InputFilter from "../../../components/UI/table/InputFilter";

const baseUrl = "http://10.0.0.101:8088/Makel/OsosApi/Sayac/SayacAyGecisEndeks";
const AllReadIndexesPage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataArray, setDataArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("01.01.2024");
  const [endDate, setEndDate] = useState("01.15.2024");

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
    const filteredData = filterDataByDateRange(dataArray, startDate, endDate);
    setFilteredData(filteredData);
    console.log(filteredData, "filtered data");
  }, [dataArray, startDate, endDate]);

  const separateArray = mapToSeparateArray(dataArray);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

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
  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderTableRows = () => {
    return currentItems.map((item, index) => (
      <tr key={index}>
        <td>{item.seriNo}</td>
        <td>{item.sayacAdi}</td>
        <td>{formatTarih(item.maxDemandTarih)}</td>
        <td>{formatLocaleString(item.aktif)}</td>
        <td>{formatLocaleString(item.tarife1)}</td>
        <td>{formatLocaleString(item.tarife2)}</td>
        <td>{formatLocaleString(item.tarife3)}</td>
        <td>{formatLocaleString(item.enduktif)}</td>
        <td>{formatLocaleString(item.kapasitif)}</td>
        <td>{calculateEndAktifRatio(item.enduktif, item.aktif)}</td>
        <td>{calculateEndAktifRatio(item.kapasitif, item.aktif)}</td>
        <td>{donemGetir(item.donemAy, item.donemYil)}</td>
      </tr>
    ));
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/${startDate}/${endDate}`);
      setDataArray(response.data);
      console.log(dataArray, "son cekme");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleSelectedData = (rows, dateRange) => {
    const date = dateRange;
    setStartDate(date[0]);
    setEndDate(date[1]);
  };

  const filterDataByDateRange = (data, startDate, endDate) => {
    const filteredDateArray = [];
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    data.forEach((item) => {
      const { sayacAdi, sayacGecmisEndeks, ...rest } = item;
      sayacGecmisEndeks.forEach((endeks) => {
        const indexDate = new Date(endeks.maxDemandTarih);
        if (indexDate >= startDateObj && indexDate <= endDateObj)
          filteredDateArray.push({
            sayacAdi,
            ...rest,
            ...endeks,
          });
      });
    });
    console.log(filteredDateArray, "filteredDateArray");
    return filteredDateArray;
  };

  return (
    <>
      <div className={styles["filter-buttons"]}>
        <Button
          type="primary"
          style={{
            backgroundColor: "#0F2545",
            border: "none",
            display: "flex",
            flexDirection: "column",
            height: "4em",
            justifyContent: "center",
            alignItems: "center",
            margin: "1em",
          }}
          onClick={showModal}
        >
          <ControlOutlined
            style={{
              fontSize: "1.5em",
            }}
          />
          Filtrele
        </Button>
        <Button
          type="primary"
          style={{
            backgroundColor: "#0F2545",
            border: "none",
            display: "flex",
            flexDirection: "column",
            height: "4em",
            justifyContent: "center",
            alignItems: "center",
            margin: "1em",
          }}
        >
          <ExportOutlined
            style={{
              fontSize: "1.5em",
            }}
          />
          Cikart
        </Button>
      </div>
      <Modal
        open={open}
        title="Filtreleme Ekrani"
        onOk={handleOk}
        onCancel={handleCancel}
        width={1400}
        footer={[
          <Button
            key="cancel"
            type="primary"
            style={{
              backgroundColor: "#e84749",
              margin: "0 20px 0 0px ",
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
              margin: "0 25px 0 0px ",
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
          onSelectedData={handleSelectedData}
        />
      </Modal>
      <div
        style={{ color: "white", overflowY: "auto" }}
        className={styles["data-table-page-container"]}
      >
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
                {loading ? (
                  <tr>
                    <td colSpan="12" className={styles.loadingSpinner}>
                      <Spin
                        indicator={
                          <LoadingOutlined style={{ fontSize: 24 }} spin />
                        }
                      />
                    </td>
                  </tr>
                ) : (
                  renderTableRows()
                )}
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
          <div className={styles.buttons}>{renderPaginationButtons()}</div>
        </div>
      </div>
    </>
  );
};

export default AllReadIndexesPage;
