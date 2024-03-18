export const donemGetir = (ay, yil) => {
  const aylar = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  return ay && yil ? `${aylar[ay - 1]} ${yil}` : "";
};

export const formatTarih = (tarih) => {
  const yeniTarih = new Date(tarih);

  const gun = String(yeniTarih.getDate()).padStart(2, "0");
  const ay = String(yeniTarih.getMonth() + 1).padStart(2, "0");
  const yil = yeniTarih.getFullYear();

  const saat = String(yeniTarih.getHours()).padStart(2, "0");
  const dakika = String(yeniTarih.getMinutes()).padStart(2, "0");
  const saniye = String(yeniTarih.getSeconds()).padStart(2, "0");

  return tarih ? `${gun}.${ay}.${yil} ${saat}:${dakika}:${saniye}` : "";
};

export const formatLocaleString = (item) => {
  return item ? Number(item).toLocaleString("tr-TR") : "";
};

export const calculateEndAktifRatio = (end, aktif) => {
  if (aktif) {
    const ratio = end / aktif;
    const formattedRatio = ratio.toFixed(1);
    return formattedRatio < 0.1 ? "" : formattedRatio;
  } else {
    return "";
  }
};
export const filterDataByDateRange = (
  data,
  startDate,
  endDate,
  selectedRows
) => {
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
  if (selectedRows.length > 0) {
    const filteredData = selectedRows.filter((item) =>
      selectedRows.some((selectedItem) => selectedItem.key === item.key)
    );
  }

  return filteredDateArray;
};

export const pageHeader = (url) => {
  switch (url) {
    case "/customers":
      return "Musteriler";
    case "/users":
      return "Kullanicilar";
    case "/loading-modem-command-job":
      return "Modem Is Emri Yukleme";
    case "/modem-parameters":
      return "Modem Parametreleri";
    case "/packages-update":
      return "Paket Guncellemeleri";
    case "/sms-control":
      return "Sms Kontrol Sayfasi";
    case "/meter":
      return "Sayac";
    case "/location":
      return "Lokasyon Sayfasi";
    case "/communication-unit":
      return "Haberlesme Unitesi";
    case "/communication-logs":
      return "Haberlesme Loglari Sayfasi";
    case "/latest-readings":
      return "Guncel Okumalar ";
    case "/new-reading":
      return "Yeni Okuma";
    case "/reading-results":
      return "Okuma Sonuclari";
    case "/meters-without-transition":
      return "Ay Gecis Endeksi Bulunmayan Sayaclar";
    case "/modem-signal-levels":
      return "Modem Sinyal Seviyeleri ";
    case "/reading-success-rates":
      return "Okuma Basari Oranlari";
    case "/current-and-voltage-info":
      return "Akim ve Gerilim Bilgileri";
    case "/dst-cancelled-meters":
      return "DST Iptal Edilen Sayaclar";
    case "/load-analysis":
      return "Yuk Analizi";
    case "/modem-digital-input-logs":
      return "Modem Sayisal Giris Loglari";
    case "/meter-clock-values":
      return "Sayac Saat Degerleri";
    case "/all-read-indexes":
      return "Okunan Tum Endeks Bilgileri";
    case "/end-of-month-indexes":
      return "Ay Sonu Endeksleri";
    case "/last-indexes-infos":
      return "Son Endeks Bilgileri";
    case "/load-profile-records":
      return "Yuk Profili Kayitlari";
    case "/month-end-consumptions":
      return "Ay Sonu Tuketimleri";
    case "/battery-status-and-chassis-cover-warnings":
      return "Pil Durumu Ve Govde Kapagi Uyarilari";
    case "/error-and-warning-meter":
      return "Hata Ve Uyari Sayaclari";
    case "/klemens-cover-warnings":
      return "Klemens Kapagi Uyarilari";
    case "/phase-errors":
      return "Faz Hatalari";
    case "/all-read-indexes-product":
      return "Okunan Tum Endeks Bilgileri - Uretim";
    case "/end-of-month-indexes-product":
      return "Ay Sonu Endeksleri - Uretim";
    case "/last-indexes-infos-product":
      return "Son Endeks Bilgileri - Uretim";
    case "/load-profile-records-product":
      return "Yuk Profili Kayitlari - Uretim";
    case "/month-end-consumptions-product":
      return "Ay Sonu Tuketimleri - Uretim";
    case "/csv-output":
      return "CSV Cikti Sayfasi";
    case "/mass-osf-form":
      return "Toplu OSF Formu";
    case "/warning-message":
      return "Uyari Mesajlari";
    case "/my-account":
      return "Kullanici Bilgileri";

    default:
      return "";
  }
};
