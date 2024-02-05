import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../modal.css";

export const AddAnalyicsDetails = ({ setAddOpen, dataNum, id }) => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [analyicsData, setAnalyicsData] = useState([]);
  const [tubeNum, setTubeNum] = useState(0);
  const [feNum, setFeNum] = useState(0);
  const [cementNum, setCementNum] = useState(0);
  const [sandNum, setSandNum] = useState(0);
  const [senNum, setSenNum] = useState(0);
  const [workerNum, setWorkerNum] = useState(0);
  const [roomNum, setRoomNum] = useState(0);
  const [floorNum, setFloorNum] = useState(0);
  const [houseNum, setHouseNum] = useState(0);
  const [woodNum, setWoodNum] = useState(0);
  const [blindNum, setBlindNum] = useState(0);
  const [lockNum, setLockNum] = useState(0);
  const [waterNum, setWaterNum] = useState(0);
  const fetchAnalyicsData = async () => {
    try {
      const res = await axios.get(
        `https://api.albahren.com/api/analyics/${id}`
      );
      setAnalyicsData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAnalyicsData();
  });
  const valuearr = [
    tubeNum,
    feNum,
    sandNum,
    senNum,
    cementNum,
    workerNum,
    floorNum,
    roomNum,
    houseNum,
    woodNum,
    blindNum,
    lockNum,
    waterNum,
  ];
  const valueNum = [];
  const switchTonNum = valuearr.forEach((ele) => {
    return valueNum.push(+ele);
  });
  const totalValueHandler = () => {
    let sum = 0;
    for (let i = 0; i < valueNum.length; i++) {
      sum += valueNum[i];
    }
    setValue(sum);
  };
  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(
        `https://api.albahren.com/api/analyicsDetails/`,
        {
          tubeNum,
          feNum,
          cementNum,
          sandNum,
          senNum,
          workerNum,
          houseNum,
          floorNum,
          roomNum,
          woodNum,
          blindNum,
          lockNum,
          waterNum,
          analyicsId: id,
          dataNum,
          value,
        }
      );
      res.status === 200 && toast.success("تم بنجاح");
      setLoading(false);
      setAddOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    totalValueHandler();
  });
  return (
    <div className="modalll">
      <span className="close" onClick={() => setAddOpen(false)}>
        X
      </span>
      <h1>{`أضافه اسعار جديده`}</h1>
      <form>
        <div className="formItem">
          <label htmlFor="tubeNum">سعر المواسير :</label>
          <input
            name="tubeNum"
            placeholder={"ادخل السعر للطن الواحد"}
            type="number"
            required
            onChange={(e) => setTubeNum(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="sandNum">سعر الرمل :</label>
          <input
            name="sandNum"
            placeholder={"ادخل السعر للمتر الواحد"}
            type="number"
            required
            onChange={(e) => setSandNum(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="senNum">سعر السن :</label>
          <input
            name="senNum"
            placeholder={"ادخل السعر للمتر الواحد"}
            type="number"
            required
            onChange={(e) => setSenNum(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="cementNum">سعر الاسمنت :</label>
          <input
            name="cementNum"
            placeholder={"ادخل السعر للمتر الواحد"}
            type="number"
            required
            onChange={(e) => setCementNum(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="feNum">سعر الحديد :</label>
          <input
            name="feNum"
            placeholder={"ادخل السعر للمتر الواحد"}
            type="number"
            required
            onChange={(e) => setFeNum(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="workerNum">سعر المصناعيه :</label>
          <input
            name="workerNum"
            placeholder={"ادخل السعر للمتر الواحد"}
            type="number"
            required
            onChange={(e) => setWorkerNum(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="roomNum">سعر الغرف :</label>
          <input
            name="roomNum"
            placeholder={"ادخل السعر للمتر الواحد"}
            type="number"
            required
            onChange={(e) => setRoomNum(e.target.value)}
          />
        </div>
        {analyicsData.type === "sarf" && (
          <div className="formItem">
            <label htmlFor="floorNum">سعر المطابق :</label>
            <input
              name="floorNum"
              placeholder={"ادخل السعر للمطبق الواحد"}
              type="number"
              onChange={(e) => setFloorNum(e.target.value)}
            />
          </div>
        )}
        {analyicsData.type === "sarf" && (
          <div className="formItem">
            <label htmlFor="houseNum">سعر الوصلات المنزليه :</label>
            <input
              name="houseNum"
              placeholder={"ادخل السعر للمتر الواحد"}
              type="number"
              onChange={(e) => setHouseNum(e.target.value)}
            />
          </div>
        )}
        {analyicsData.type === "sarf" && (
          <div className="formItem">
            <label htmlFor="woodNum">سعر الاخشاب :</label>
            <input
              name="woodNum"
              placeholder={"ادخل السعر للمتر الواحد"}
              type="number"
              onChange={(e) => setWoodNum(e.target.value)}
            />
          </div>
        )}
        {analyicsData.type === "sarf" && (
          <div className="formItem">
            <label htmlFor="blindNum">سعر التجفيف :</label>
            <input
              name="blindNum"
              placeholder={"ادخل السعر للمتر الواحد"}
              type="number"
              onChange={(e) => setBlindNum(e.target.value)}
            />
          </div>
        )}
        <div className="formItem">
          <label htmlFor="lockNum">سعر المحابس :</label>
          <input
            name="lockNum"
            placeholder={"ادخل السعر للمتر الواحد"}
            type="number"
            required
            onChange={(e) => setLockNum(e.target.value)}
          />
        </div>
        {analyicsData.type === "water" && (
          <div className="formItem">
            <label htmlFor="waterNum">سعر وصلات المياه :</label>
            <input
              name="waterNum"
              placeholder={"ادخل السعر للمقطعيه الواحده"}
              type="number"
              required
              onChange={(e) => setWaterNum(e.target.value)}
            />
          </div>
        )}
        {loading === true ? (
          <span className="loader"></span>
        ) : (
          <button className="addButton" onClick={handleAdd}>
            أضافه
          </button>
        )}
      </form>
    </div>
  );
};
