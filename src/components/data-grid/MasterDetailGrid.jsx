import React, { useEffect, useState } from "react";
import DataGrid from "devextreme-react/data-grid";
import { createStore } from "devextreme-aspnet-data-nojquery";

const url = "http://10.0.0.101:8088/Makel/OsosApi/Sayac";
const getMasterDetailGridDataSource = (id) => ({
  store: createStore({
    loadUrl: `${url}`,
    loadParams: { orderID: id },
    onBeforeSend: (method, ajaxOptions) => {
      ajaxOptions.xhrFields = { withCredentials: true };
    },
  }),
});
const MasterDetailGrid = (props) => {
  const [dataSource, setDataSource] = useState(null);
  useEffect(() => {
    const masterDetailDataSource = getMasterDetailGridDataSource(
      props.data.key
    );
    setDataSource(masterDetailDataSource);
  }, [props.data.key]);
  return <DataGrid dataSource={dataSource} showBorders={true} />;
};
export default MasterDetailGrid;
