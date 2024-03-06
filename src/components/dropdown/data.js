const products = [
  {
    id: "1",
    name: "Anasayfa",
    link: "/",
  },
  {
    id: "2",
    name: "Kullanici",
    items: [
      {
        id: "2_1",
        name: "Kullanicilar",
        link: "/users",
      },
      {
        id: "2_2",
        name: "Musteriler",
        link: "/customers",
      },
    ],
  },
  {
    id: "3",
    name: "Tesisat Semasi",
    items: [
      {
        id: "3_1",
        name: "Lokasyon",
        link: "/location",
      },
      {
        id: "3_2",
        name: "Sayac",
        link: "/meter",
      },
      {
        id: "3_3",
        name: "Haberlesme Unitesi",
        link: "/meter",
      },
    ],
  },
  {
    id: "4",
    name: "Okumalar",
    items: [
      {
        id: "4_1",
        name: "Yeni Okuma",
        link: "/new-reading",
      },
      {
        id: "4_2",
        name: "Guncel Okumalar",
        link: "/latest-reading",
      },
      {
        id: "4_3",
        name: "Okuma Sonuclari",
        link: "/reading-results",
      },
      {
        id: "4_4",
        name: "Haberlesme Loglari",
        link: "/communication-logs",
      },
      {
        id: "4_5",
        name: "Istatistikler",
        items: [
          {
            id: "4_5_1",
            name: "Okuma Basari Oranlari",
            link: "/users",
          },
          {
            id: "4_5_2",
            name: "Modem Sinyal Seviyesi",
            link: "/customers",
          },
          {
            id: "4_5_3",
            name: "Ay Gecis Endeksi Bulunmayan Sayaclar",
            link: "/customers",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "Raporlar",
    items: [
      {
        id: "5_1",
        name: "Sayac Endeksleri",
        items: [
          {
            id: "5_1_1",
            name: "Okunan Tum Endeksler",
            link: "",
          },
          {
            id: "5_1_2",
            name: "Ay Sonu Endeksleri",
            link: "",
          },
          {
            id: "5_1_3",
            name: "Ay Sonu Tuketimleri",
            link: "",
          },
          {
            id: "5_1_4",
            name: "Son Endeks Bilgileri",
            link: "",
          },
          {
            id: "5_1_5",
            name: "Yuk Profili Kayitlari",
            link: "",
          },
        ],
      },
      {
        id: "5_2",
        name: "Sebekeye Verilen Endeksler ",
        items: [
          {
            id: "5_2_1",
            name: "Okunan Tum Endeksler - Uretim",
            link: "",
          },
          {
            id: "5_2_2",
            name: "Ay Sonu Endeksleri - Uretim",
            link: "",
          },
          {
            id: "5_2_3",
            name: "Ay Sonu Tuketimleri - Uretim",
            link: "",
          },
          {
            id: "5_2_4",
            name: "Son Endeks Bilgileri - Uretim",
            link: "",
          },
          {
            id: "5_2_5",
            name: "Yuk Profili Kayitlari - Uretim",
            link: "",
          },
        ],
      },
      {
        id: "5_3",
        name: "Sayac Hatalari",
        items: [
          {
            id: "5_3_1",
            name: "Faz Hatalari",
            link: "",
          },
          {
            id: "5_3_2",
            name: "Klemens Kapagi Uyarilari",
            link: "",
          },
          {
            id: "5_3_3",
            name: "Hata Ve Uyari Sayaclari",
            link: "",
          },
          {
            id: "5_3_4",
            name: "Pil Durumu Ve Govde Kapagi Uyarilari",
            link: "",
          },
        ],
      },
      {
        id: "5_4",
        name: "Zaman Farklari",
        items: [{ id: "5_4_1", name: "Sayac Saat Degerleri", link: "" }],
      },
      {
        id: "5_5",
        name: "Akim Gerilim Bilgileri",
        link: "",
      },
      {
        id: "5_6",
        name: "Yuk Analizi",
        link: "",
      },
      {
        id: "5_7",
        name: "Modem Sayisal Giris Loglari",
        link: "",
      },
      {
        id: "5_8",
        name: "Veri Cikart",
        items: [
          {
            id: "5_8_1",
            name: "Toplu OSF Formu",
            link: "",
          },
          {
            id: "5_8_2",
            name: "CSV Ciktisi",
            link: "",
          },
        ],
      },
      {
        id: "5_9",
        name: "DST Iptal Edilen Sayaclar",
        link: "",
      },
    ],
  },
  {
    id: "6",
    name: "Modem Islemleri",
    items: [
      {
        id: "6_1",
        name: "Paketler",
        items: [
          {
            id: "6_1_1",
            name: "Paket Guncelleme",
            link: "",
          },
        ],
      },
      {
        id: "6_2",
        name: "Modem Parametreleri",
        link: "",
      },
      {
        id: "6_3",
        name: "Modem Is Emri Yukleme",
        link: "",
      },
      {
        id: "6_4",
        name: "SMS Kontrol Sayfasi",
        link: "",
      },
    ],
  },
  {
    id: "7",
    name: "Hesabim",
    link: "my-account",
  },
  {
    id: "8",
    name: "Cikis",
  },
];
export default {
  getProducts() {
    return products;
  },
};
