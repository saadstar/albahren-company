import React, { useEffect, useState } from "react";
import "../car/car.css";
import axios from "axios";
import { AddSallery } from "./AddSallery";

export const Sallery = () => {
  const [salleryData, setSalleryData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const filteredSallery = salleryData.filter((item) => {
    return search === "" ? item : item.name === search;
  });

  useEffect(() => {
    const fetchSallery = async () => {
      try {
        const res = await axios.get("https://api.albahren.com/api/sallery");
        setSalleryData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSallery();
  }, [salleryData._id]);

  return (
    <div className="car">
      <div className="carHeader">
        <h1>المرتبات</h1>
        <button onClick={() => setOpenModal(true)}>اضف مرتب جديد</button>
      </div>
      <div class="d-flex p-4" role="search" width="50%">
        <input
          class="form-control me-2"
          type="search"
          placeholder="أبحث بإسم الموظف..."
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search"
        />
        <button class="btn btn-success" type="submit">
          بحث
        </button>
      </div>
      {filteredSallery.length === 0 ? (
        <div>لا يوجد مرتبات</div>
      ) : (
        <table class="table table-hover mt-3">
          <thead>
            <tr>
              <th scope="col d-flex" className="col d-flex">
                الاسم
              </th>
              <th scope="col d-flex">الوظيفه</th>
              <th scope="col d-flex">المرتب</th>
              <th scope="col d-flex">التاريخ</th>
              <th scope="col d-flex">الحوافز</th>
              <th scope="col d-flex">الموقع</th>
              <th scope="col d-flex">ملاحظات</th>
            </tr>
          </thead>
          <tbody>
            {filteredSallery.reverse().map((item) => (
              <tr>
                <td className="zz">{item.name}</td>
                <td className="zz">{item.role}</td>
                <td className="zz">{item.salleryNum}</td>
                <td className="zz">{item.createdAt.split("T")[0]}</td>
                <td className="zz">{item.added}</td>
                <td className="zz">{item.site}</td>
                <td className="zz">{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {openModal && <AddSallery setOpenModal={setOpenModal} />}
    </div>
  );
};
