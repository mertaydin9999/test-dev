import React from "react";
import { MdFactory } from "react-icons/md";
import { MdElectricMeter } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { MdShortText } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";
import { MdOutlinePlumbing } from "react-icons/md";
import { FaBarcode } from "react-icons/fa6";
import { TbMultiplier1X } from "react-icons/tb";
import { FaPercentage } from "react-icons/fa";
import { GrDirections } from "react-icons/gr";
import { FaWeight } from "react-icons/fa";
import { GoNote } from "react-icons/go";
const RenderMeterTableTh = () => {
  return (
    <tr>
      <th>
        Üretici <MdFactory />
      </th>
      <th>
        Model <MdElectricMeter />
      </th>
      <th>
        Sayaç Adı
        <IoSpeedometer />
      </th>
      <th>
        Seri No <MdShortText />
      </th>
      <th>
        Abone No <BsPersonLinesFill />
      </th>
      <th>
        Tesisat No <MdOutlinePlumbing />
      </th>
      <th>
        Sayaç Kodu
        <FaBarcode />
      </th>
      <th>
        Çarpan <TbMultiplier1X />
      </th>
      <th>
        Akım Trafo Oranı
        <FaPercentage />
      </th>
      <th>
        Çift Yön <GrDirections />
      </th>
      <th>
        Gerilim Trafo Oranı
        <FaPercentage />
      </th>
      <th>
        Birim <FaWeight />
      </th>
      <th>
        Yük Profili Birim <FaWeight />
      </th>
      <th>
        Yük Profili Kayıt
        <GoNote />
      </th>
    </tr>
  );
};

export default RenderMeterTableTh;
