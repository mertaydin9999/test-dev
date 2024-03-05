import "devextreme/dist/css/dx.light.css";
import "devextreme/data/odata/store";

import {
  Column,
  DataGrid,
  FilterRow,
  HeaderFilter,
  GroupPanel,
  Scrolling,
  Editing,
  Grouping,
  Lookup,
  MasterDetail,
  Export,
  RangeRule,
  RequiredRule,
  StringLengthRule,
} from "devextreme-react/data-grid";
import { createStore } from "devextreme-aspnet-data-nojquery";
import MasterDetailGrid from "./MasterDetailGrid";

import React, { useCallback, useState } from "react";
import { Pager, Paging } from "devextreme-react/data-grid";

import { jsPDF } from "jspdf";
import { exportDataGrid } from "devextreme/pdf_exporter";

const exportFormats = ["pdf"];
const onExportingPdf = (e) => {
  const doc = new jsPDF();
  exportDataGrid({
    jsPDFDocument: doc,
    component: e.component,
    indent: 5,
  }).then(() => {
    doc.save("Companies.pdf");
  });
};


const allowedPageSizes = [5, 10, "all"];

const url = "https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi";
const dataSource = createStore({
  key: "OrderID",
  loadUrl: `${url}/Orders`,
  insertUrl: `${url}/InsertOrder`,
  updateUrl: `${url}/UpdateOrder`,
  deleteUrl: `${url}/DeleteOrder`,
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.xhrFields = { withCredentials: true };
  },
});

const customersData = createStore({
  key: "Value",
  loadUrl: `${url}/CustomersLookup`,
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.xhrFields = { withCredentials: true };
  },
});
const shippersData = createStore({
  key: "Value",
  loadUrl: `${url}/ShippersLookup`,
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.xhrFields = { withCredentials: true };
  },
});
const DataGridTemplate = () => {
  const [displayMode, setDisplayMode] = useState("full");
  const [showPageSizeSelector, setShowPageSizeSelector] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [showNavButtons, setShowNavButtons] = useState(true);

  const displayModeChange = useCallback((value) => {
    setDisplayMode(value);
  }, []);
  const showPageSizeSelectorChange = useCallback((value) => {
    setShowPageSizeSelector(value);
  }, []);
  const showInfoChange = useCallback((value) => {
    setShowInfo(value);
  }, []);
  const showNavButtonsChange = useCallback((value) => {
    setShowNavButtons(value);
  }, []);
  const isCompactMode = useCallback(
    () => displayMode === "compact",
    [displayMode]
  );
  return (
    <DataGrid
      dataSource={dataSource}
      showBorders={true}
      width="100%"
      height={500}
      remoteOperations={true}
      columnAutoWidth={true}
      rowAlternationEnabled={false}
      onExporting={onExportingPdf}
    >
      <Export
        enabled={true}
        formats={exportFormats}
        allowExportSelectedData={true}
      />
      <Paging defaultPageSize={10} />
      <Pager
        visible={true}
        allowedPageSizes={allowedPageSizes}
        displayMode={displayMode}
        showPageSizeSelector={showPageSizeSelector}
        showInfo={showInfo}
        showNavigationButtons={showNavButtons}
        infoText="Sayfa {0}  |  Toplam: {1} ({2} kullanici)"
      />
      <MasterDetail enabled={true} component={MasterDetailGrid} />
      <FilterRow visible={true} />
      <HeaderFilter visible={true} />
      <GroupPanel visible={true} />
      <Scrolling mode="virtual" />
      <Editing
        mode="row"
        allowAdding={true}
        allowDeleting={true}
        allowUpdating={true}
      />
      <Grouping autoExpandAll={false} />

      <Column dataField="CustomerID" caption="Sayac">
        <Lookup
          dataSource={customersData}
          valueExpr="Value"
          displayExpr="Text"
        />
        <StringLengthRule
          max={5}
          message="The field Customer must be a string with a maximum length of 5."
        />
      </Column>

      <Column dataField="OrderDate" dataType="date" caption="Tarih">
        <RequiredRule message="The OrderDate field is required." />
      </Column>

      <Column dataField="Freight" caption="Seri No">
        <HeaderFilter groupInterval={100} />
        <RangeRule
          min={0}
          max={2000}
          message="The field Freight must be between 0 and 2000."
        />
      </Column>

      <Column dataField="ShipCountry" caption="Abone No">
        <StringLengthRule
          max={15}
          message="The field ShipCountry must be a string with a maximum length of 15."
        />
      </Column>

      <Column dataField="ShipVia" caption="Tesisat No" dataType="number">
        <Lookup
          dataSource={shippersData}
          valueExpr="Value"
          displayExpr="Text"
        />
      </Column>
      <Column dataField="ShipCountry" caption="Sayac Kodu">
        <StringLengthRule
          max={15}
          message="The field ShipCountry must be a string with a maximum length of 15."
        />
      </Column>
      <Column dataField="ShipCountry" caption="Carpan">
        <StringLengthRule
          max={2}
          message="The field ShipCountry must be a string with a maximum length of 15."
        />
      </Column>
    </DataGrid>
  );
};

export default DataGridTemplate;
