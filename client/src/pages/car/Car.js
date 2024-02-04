import React, { useEffect, useState } from "react";
import "./car.css";
import axios from "axios";
import { AddCar } from "./AddCar";

export const Car = () => {
  const [carData, setCarData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchCar = async () => {
    try {
      const res = await axios.get("https://api.eleaman.com/api/car");
      setCarData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCar();
  });

  return (
    <div className="car">
      <div className="carHeader">
        <h1>السياره</h1>
        <button onClick={() => setOpenModal(true)}>اضف تحرك سياره</button>
      </div>
      <table class="table table-hover mt-3">
        <thead>
          <tr className="bb">
            <th scope="col d-flex" className="text-center">
              سائق السياره
            </th>
            <th scope="col d-flex" className="text-center">
              سعر البنزين
            </th>
            <th scope="col d-flex" className="text-center">
              الكيلومتر
            </th>
            <th scope="col d-flex" className="text-center">
              الزيت
            </th>
            <th scope="col d-flex" className="text-center">
              التاريخ
            </th>
          </tr>
        </thead>
        <tbody>
          {carData.reverse().map((item) => (
            <tr key={item._id}>
              <td className="zz">{item.name}</td>
              <td className="zz">{item.price}</td>
              <td className="zz">{item.km}</td>
              <td className="zz">{item.oil}</td>
              <td className="zz">{item.createdAt.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {openModal && <AddCar setOpenModal={setOpenModal} />}
    </div>
  );
};
