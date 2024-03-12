import { useState } from "react";
import { Table, DatePicker, Checkbox } from "antd";
const FilterTable = ({ dataSource }) => {
  const [selectionType, setSelectionType] = useState("checkbox");
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
  const columns = [
    {
      title: "Sayac",
      dataIndex: "sayacAdi",
      key: "1",
    },
    {
      title: "Seri No",
      dataIndex: "seriNo",
      key: "2",
    },
    {
      title: "Abone No",
      dataIndex: "aboneNo",
      key: "3",
    },
    {
      title: "Sayac Kodu",
      dataIndex: "sayacKodu",
      key: "4",
    },
    {
      title: "Carpan",
      dataIndex: "carpan",
      key: "5",
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
        <div>
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            size="small"
            columnWidth={0}
            columns={columns}
            dataSource={dataSource}
          />
        </div>
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

export default FilterTable;
