import MeterDataTable from "../../components/tables/meterTable/MeterDataTable";
const url = "http://10.0.0.101:8088/Makel/OsosApi/Sayac";
const MeterPage = () => {
  return <MeterDataTable url={url} />;
};

export default MeterPage;
