import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Checkbox, DatePicker } from "antd";
import Highlighter from "react-highlight-words";
const InputFilter = ({ dataSource }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectionType, setSelectionType] = useState("checkbox");
  const searchInput = useRef(null);

  const onChangeDatePicker = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangeCheckbox = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
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
          placeholder={`Search ${dataIndex}`}
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
            size="small"
            style={{
              width: 90,
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
          color: filtered ? "#1677ff" : undefined,
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
          border: "1px solid grey",
        }}
      >
        <div>SAYAC</div>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          size="small"
          columns={columns}
          dataSource={dataSource}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "",
          border: "1px solid grey",
        }}
      >
        <div>LOKASYON</div>
        <div>
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            size="small"
            columnWidth={0}
            columns={columnsLocation}
            dataSource={dataSource}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2em",
          border: "1px solid black",
          padding: "1em",
        }}
      >
        <div>TARIH </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".5em",
          }}
        >
          <span>Baslangic Tarihi</span>
          <DatePicker onChange={onChangeDatePicker} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".5em",
          }}
        >
          <span>Bitis Tarihi</span>
          <DatePicker onChange={onChangeDatePicker} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".5em",
          }}
        >
          <Checkbox onChange={onChangeCheckbox}>
            Enerji Oranlarini Goster
          </Checkbox>
          <Checkbox onChange={onChangeCheckbox}>
            Demand Degerlerini Goster
          </Checkbox>
          <Checkbox onChange={onChangeCheckbox}>
            Carpan Degerlerini Hesaba Kat
          </Checkbox>
          <Checkbox onChange={onChangeCheckbox}>
            Okunamayan Sayaclarin Endeksini 0 goster
          </Checkbox>
        </div>
      </div>
    </div>
  );
};

export default InputFilter;
