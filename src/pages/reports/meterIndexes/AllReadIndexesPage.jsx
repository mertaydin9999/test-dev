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
const url =
  "http://10.0.0.101:8088/Makel/OsosApi/Sayac/SayacAyGecisEndeks/01.01.2024/03.11.2024";
const AllReadIndexesPage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataArray, setDataArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setDataArray(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
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

  const separateArray = mapToSeparateArray(dataArray);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(separateArray.length / itemsPerPage);
  const currentItems = separateArray?.slice(indexOfFirstItem, indexOfLastItem);

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
  //Modal alani-------------------

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
    <>
      <div>
        <h3>Sayac Endeksleri</h3>
      </div>
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
          onClick={showModal}
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
              margin: "0 75px 0 0px ",
              padding: "0em 5em",
            }}
            loading={loading}
            onClick={handleOk}
          >
            Filtrele
          </Button>,
        ]}
      >
        <InputFilter dataSource={separateArray} />
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
            <span>({separateArray.length} öğe)</span>
          </p>
          <div className={styles.buttons}>{renderPaginationButtons()}</div>
        </div>
      </div>
    </>
  );
};

export default AllReadIndexesPage;
