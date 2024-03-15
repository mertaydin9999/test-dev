import React from "react";
import {
  donemGetir,
  formatTarih,
  formatLocaleString,
  calculateEndAktifRatio,
} from "../../../utils/dataFunctions";
const RenderTableRows = ({ currentItems }) => {
  return currentItems.map((item, index) => (
    <tr key={index}>
      <td>{item.seriNo}</td>
      <td>{item.sayacAdi}</td>
      <td>{formatTarih(item.maxDemandTarih)}</td>
      <td>{formatLocaleString(item.aktif)}</td>
      <td>{formatLocaleString(item.tarife1)}</td>
      <td>{formatLocaleString(item.tarife2)}</td>
      <td>{formatLocaleString(item.tarife3)}</td>
      <td>{formatLocaleString(item.enduktif)}</td>
      <td>{formatLocaleString(item.kapasitif)}</td>
      <td>{calculateEndAktifRatio(item.enduktif, item.aktif)}</td>
      <td>{calculateEndAktifRatio(item.kapasitif, item.aktif)}</td>
      <td>{donemGetir(item.donemAy, item.donemYil)}</td>
    </tr>
  ));
};

export default RenderTableRows;
