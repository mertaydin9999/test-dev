import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Checkbox, DatePicker } from "antd";
import Highlighter from "react-highlight-words";
import styles from "./InputFilter.module.css";
const { RangePicker } = DatePicker;

const InputFilter = ({ dataSource, onFilterChange }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectionType, setSelectionType] = useState("checkbox");
  const [dateRange, setDateRange] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const onChangeDatePicker = (dates, dateStrings) => {
    const formattedDateStrings = dateStrings.map((date) => {
      const [year, month, day] = date.split("-");
      return `${month}.${day}.${year}`;
    });
    setDateRange(formattedDateStrings);
  };
  useEffect(() => {
    onFilterChange(selectedRows, dateRange);
  }, [selectedRows, dateRange]);

  const handleRowSelection = (selectedRows) => {
    setSelectedRows(selectedRows);
  };
  const searchInput = useRef(null);

  const onChangeCheckbox = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      handleRowSelection(selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Ara ...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="medium"
            style={{
              width: 90,
              color: "#f6f6f6",
            }}
          >
            Filtrele
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Sifirla
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : "#f6f6f6",
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Sayac",
      dataIndex: "sayacAdi",
      key: "sayacAdi",
      width: "30%",
      ...getColumnSearchProps("sayacAdi"),
    },
    {
      title: "Seri No",
      dataIndex: "seriNo",
      key: "seriNo",
      width: "20%",
      ...getColumnSearchProps("seriNo"),
    },
    {
      title: "Abone No",
      dataIndex: "aboneNo",
      key: "aboneNo",
      ...getColumnSearchProps("aboneNo"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tesisat No",
      dataIndex: "tesisatNo",
      key: "tesisatNo",
      ...getColumnSearchProps("tesisatNo"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Sayac Kodu",
      dataIndex: "sayacKodu",
      key: "sayacKodu",
      ...getColumnSearchProps("sayacKodu"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Carpan",
      dataIndex: "carpan",
      key: "carpan",
      ...getColumnSearchProps("carpan"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];
  const columnsLocation = [
    {
      title: "Lokasyon",
      dataIndex: "sayacAdi",
      key: "1",
    },
  ];
  const getRowClassName = () => {
    // Tüm satırlar için aynı sınıfı döndür
    return styles["same-color-row"];
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "2em",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "",
          borderRight: "1px solid white",
          paddingRight: "1em",
        }}
      >
        <p
          style={{
            color: "#f6f6f6",
            fontSize: "1.5em",
          }}
        >
          Sayac
        </p>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          size="small"
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
            style: {
              backgroundColor: "#15417E",
              color: "#f6f6f6",
              borderRadius: ".3em",
            },
            size: "default",
            showSizeChanger: false,
          }}
          rowClassName={getRowClassName}
        />
      </div>

      <div className={styles["date-container-wrapper"]}>
        <p
          style={{
            color: "#f6f6f6",
            fontSize: "1.5em",
          }}
        >
          Tarih
        </p>
        <div className={styles["date-container"]}>
          <p>Baslangic ve Bitis Tarihi </p>
          <div className={styles["date-picker-div"]}>
            <RangePicker onChange={onChangeDatePicker} />
          </div>
          <div className={styles["date-checkboxes"]}>
            <Checkbox className={styles.checkbox} onChange={onChangeCheckbox}>
              Enerji Oranlarini Goster
            </Checkbox>
            <Checkbox className={styles.checkbox} onChange={onChangeCheckbox}>
              Demand Degerlerini Goster
            </Checkbox>
            <Checkbox className={styles.checkbox} onChange={onChangeCheckbox}>
              Carpan Degerlerini Hesaba Kat
            </Checkbox>
            <Checkbox className={styles.checkbox} onChange={onChangeCheckbox}>
              Okunamayan Sayaclarin Endeksini 0 goster
            </Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputFilter;
