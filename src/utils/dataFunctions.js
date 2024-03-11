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
