const items = [
  getItem("Anasayfa", "/", <HomeOutlined />),
  getItem("Kullanıcı", "1", <UserOutlined />, [
    getItem("Kullanıcılar", "/users"),
    getItem("Müşteriler", "/customers"),
  ]),
  getItem("Tesisat Şeması", "2", <PieChartOutlined />, [
    getItem("Lokasyon", "/location"),
    getItem("Sayaç", "/meter"),
    getItem("Haberleşme Ünitesi", "/communication-unit"),
  ]),
  getItem("Okumalar", "3", <DesktopOutlined />, [
    getItem("Yeni Okuma", "/new-reading"),
    getItem("Güncel Okumalar", "/latest-reading"),
    getItem("Okuma Sonuçları", "/reading-results"),
    getItem("Haberleşme Logları", "/communication-logs"),
    getItem("İstatistikler", "4", [
      getItem("Okuma Başarı Oranları", "/reading-success-rates"),
      getItem("Modem Sinyal Seviyesi", "/modem-signal-levels"),
      getItem("Ay Geçiş Endeksi Bulunmayan Sayaçlar", "/meters-without-transition"),
    ]),
  ]),
  getItem("Raporlar", "5", <FileOutlined />, [
    getItem("Sayac Endeksleri", [
      getItem("Okunan Tüm Endeksler", "/all-read-indexes"),
      getItem("Ay Sonu Endeksleri", "/end-of-month-indexes"),
      getItem("Ay Sonu Tüketimleri", "/month-end-consumptions"),
      getItem("Son Endeks Bilgileri", "/last-index-infos"),
      getItem("Yük Profili Kayıtları", "/load-profile-records"),
    ]),
    getItem("Sebekeye Verilen Endeksler", "6", [
      getItem("Okunan Tüm Endeksler - Üretim", "/all-read-indexes-product"),
      getItem("Ay Sonu Endeksleri - Üretim", "/end-of-month-indexes-product"),
      getItem("Ay Sonu Tüketimleri - Üretim", "/month-end-consumptions-product"),
      getItem("Son Endeks Bilgileri - Üretim", "/last-index-infos-product"),
      getItem("Yük Profili Kayıtları - Üretim", "/load-profile-records-product"),
    ]),
    getItem("Sayac Hataları", "7", [
      getItem("Faz Hataları", "/phase-errors"),
      getItem("Klemens Kapakı Uyarıları", "/klemens-cover-warnings"),
      getItem("Hata Ve Uyarı Sayaçları", "/error-and-warnings-meter"),
      getItem("Pil Durumu Ve Gövde Kapakı Uyarıları", "/battery-status-and-chassis-cover-warnings"),
    ]),
    getItem("Zaman Farkları", "8", [
      getItem("Sayaç Saat Değerleri", "/meter-clock-values"),
    ]),
    getItem("Akım Gerilim Bilgileri", "/current-and-voltage-info"),
    getItem("Yük Analizi", "/load-analysis"),
    getItem("Modem Sayısal Giriş Logları", "/modem-digital-input-logs"),
    getItem("Veri Çıkart", "9", [
      getItem("Toplu OSF Formu", "/mass-osf-form"),
      getItem("CSV Çıktısı", "/csv-output"),
    ]),
    getItem("DST İptal Edilen Sayaçlar", "/dst-cancelled-meters"),
  ]),
  getItem("Modem İşlemleri", "10", <TeamOutlined />, [
    getItem("Paketler", [
      getItem("Paket Güncelleme", "/packages-update"),
    ]),
    getItem("Modem Parametreleri", "/modem-parameters"),
    getItem("Modem İş Emri Yükleme", "/loading-modem-command-job"),
    getItem("SMS Kontrol Sayfası", "sms-control"),
  ]),
  getItem("Hesabım", "/my-account"),
  getItem("Çıkış", "11"),
];