import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Products from "./pages/Products";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import MeterPage from "./pages/plumbing/MeterPage";
import LoginPage from "./pages/auth/LoginPage";
import MyAccountPage from "./pages/auth/MyAccountPage";
import LoadingModemCommandJobPage from "./pages/modemWorks/LoadingModemCommandJobPage";
import ModemParametersPage from "./pages/modemWorks/ModemParametersPage";
import PackagesUpdatePage from "./pages/modemWorks/PackagesUpdatePage";
import SmsControlPage from "./pages/modemWorks/SmsControlPage";
import CommunicationUnitPage from "./pages/plumbing/CommunicationUnitPage";
import LocationPage from "./pages/plumbing/LocationPage";
import MetersWithoutTransitionPage from "./pages/readings/statistics/MetersWithoutTransitionPage";
import ModemSignalLevelsPage from "./pages/readings/statistics/ModemSignalLevelsPage";
import ReadingSuccessRatesPage from "./pages/readings/statistics/ReadingSuccessRatesPage";
import CommunicationLogsPage from "./pages/readings/CommunicationLogsPage";
import LatestReadingsPage from "./pages/readings/LatestReadingsPage";
import NewReadingPage from "./pages/readings/NewReadingPage";
import ReadingResultsPage from "./pages/readings/ReadingResultsPage";
import CsvOutputPage from "./pages/reports/extractData/CsvOutputPage";
import MassOsfFormPage from "./pages/reports/extractData/MassOsfFormPage";
import AllReadIndexesProductPage from "./pages/reports/indexesProvidedToGrid/AllReadIndexesProductPage";
import LastIndexesInfosProductPage from "./pages/reports/indexesProvidedToGrid/LastIndexesInfosProductPage";
import LoadProfileRecordsProductPage from "./pages/reports/indexesProvidedToGrid/LoadProfileRecordsProductPage";
import MonthEndConsumptionsProductPage from "./pages/reports/indexesProvidedToGrid/MonthEndConsumptionsProductPage";
import MonthEndIndexesProductPage from "./pages/reports/indexesProvidedToGrid/MonthEndIndexesProductPage";
import BatteryStatusAndChassisCoverWarningsPage from "./pages/reports/meterErrors/BatteryStatusAndChassisCoverWarningsPage";
import ErrorAndWarningMeterPage from "./pages/reports/meterErrors/ErrorAndWarningMeterPage";
import KlemensCoverWarningsPage from "./pages/reports/meterErrors/KlemensCoverWarningsPage";
import PhaseErrorsPage from "./pages/reports/meterErrors/PhaseErrorsPage";
import AllReadIndexesPage from "./pages/reports/meterIndexes/AllReadIndexesPage";
import EndOfMonthIndexesPage from "./pages/reports/meterIndexes/EndOfMonthIndexesPage";
import LastIndexInfosPage from "./pages/reports/meterIndexes/LastIndexInfosPage";
import LoadProfileRecordsPage from "./pages/reports/meterIndexes/LoadProfileRecordsPage";
import MonthEndConsumptionsPage from "./pages/reports/meterIndexes/MonthEndConsumptionsPage";
import MeterClockValuesPage from "./pages/reports/timeDifferences/MeterClockValuesPage";
import CurrentAndVoltageInfoPage from "./pages/reports/CurrentAndVoltageInfoPage";
import DstCancelledMetersPage from "./pages/reports/DstCancelledMetersPage";
import LoadAnalysisPage from "./pages/reports/LoadAnalysisPage";
import ModemDigitalInputLogsPage from "./pages/reports/ModemDigitalInputLogsPage";
import CustomersPage from "./pages/users/CustomersPage";
import UsersPage from "./pages/users/UsersPage";
import WarningMessagePage from "./pages/warningMessage/WarningMessagePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <Products /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/my-account", element: <MyAccountPage /> },
      {
        path: "/loading-modem-command-job",
        element: <LoadingModemCommandJobPage />,
      },
      { path: "/modem-parameters", element: <ModemParametersPage /> },
      { path: "/packages-update", element: <PackagesUpdatePage /> },
      { path: "/sms-control-page", element: <SmsControlPage /> },
      { path: "/communication-unit", element: <CommunicationUnitPage /> },
      { path: "/location", element: <LocationPage /> },
      { path: "/meter", element: <MeterPage /> },
      {
        path: "/meters-without-transition",
        element: <MetersWithoutTransitionPage />,
      },
      {
        path: "/modem-signal-levels",
        element: <ModemSignalLevelsPage />,
      },
      {
        path: "/reading-success-rates",
        element: <ReadingSuccessRatesPage />,
      },
      {
        path: "/communication-logs",
        element: <CommunicationLogsPage />,
      },
      {
        path: "/latest-readings",
        element: <LatestReadingsPage />,
      },
      {
        path: "/new-reading",
        element: <NewReadingPage />,
      },
      {
        path: "/reading-results",
        element: <ReadingResultsPage />,
      },
      {
        path: "/csv-output",
        element: <CsvOutputPage />,
      },
      {
        path: "/mass-osf-form",
        element: <MassOsfFormPage />,
      },
      {
        path: "/all-read-indexes-product",
        element: <AllReadIndexesProductPage />,
      },
      {
        path: "/last-indexes-infos-product",
        element: <LastIndexesInfosProductPage />,
      },
      {
        path: "/load-profile-records-product",
        element: <LoadProfileRecordsProductPage />,
      },
      {
        path: "/month-end-consumptions-product",
        element: <MonthEndConsumptionsProductPage />,
      },
      {
        path: "/month-end-indexes-product",
        element: <MonthEndIndexesProductPage />,
      },
      {
        path: "/battery-status-and-chassis-cover-warnings",
        element: <BatteryStatusAndChassisCoverWarningsPage />,
      },
      {
        path: "/error-and-warnings-meter",
        element: <ErrorAndWarningMeterPage />,
      },
      {
        path: "/klemens-cover-warnings",
        element: <KlemensCoverWarningsPage />,
      },
      {
        path: "/phase-errors",
        element: <PhaseErrorsPage />,
      },
      {
        path: "/all-read-indexes",
        element: <AllReadIndexesPage />,
      },
      {
        path: "/end-of-month-indexes",
        element: <EndOfMonthIndexesPage />,
      },
      {
        path: "/last-index-infos",
        element: <LastIndexInfosPage />,
      },
      {
        path: "/load-profile-records",
        element: <LoadProfileRecordsPage />,
      },
      {
        path: "/month-end-consumptions",
        element: <MonthEndConsumptionsPage />,
      },
      {
        path: "/meter-clock-values",
        element: <MeterClockValuesPage />,
      },
      {
        path: "/current-and-voltage-info",
        element: <CurrentAndVoltageInfoPage />,
      },
      {
        path: "/dst-cancelled-meters",
        element: <DstCancelledMetersPage />,
      },
      {
        path: "/load-analysis",
        element: <LoadAnalysisPage />,
      },
      {
        path: "/modem-digital-input-logs",
        element: <ModemDigitalInputLogsPage />,
      },
      {
        path: "/customers",
        element: <CustomersPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/warning-message",
        element: <WarningMessagePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
