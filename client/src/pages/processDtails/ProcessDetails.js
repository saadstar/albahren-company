import React, { useContext, useEffect, useState } from "react";
import "./processDetails.css";
import { Menu } from "./Menu/Menu";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../auth/authContext/authContext";
import { toast } from "react-toastify";

export const ProcessDetails = () => {
  const { user } = useContext(AuthContext);
  const [processBand, setProcessBand] = useState([]);
  const [processData, setProcessData] = useState([]);
  const [processIncome, setProcessIncome] = useState(0);
  const [processTitle, setProcessTitle] = useState({});
  const { id } = useParams();
  const tubesValue = [];
  const sandValue = [];
  const senValue = [];
  const cementValue = [];
  const detailsValue = [];
  const workerValue = [];
  const materialsValue = [];
  const azlValue = [];
  const transportValue = [];
  const repairValue = [];
  const woodValue = [];
  const roomsValue = [];
  const [tubesTotal, setTubesTotal] = useState(0);
  const [sandTotal, setSandTotal] = useState(0);
  const [senTotal, setSenTotal] = useState(0);
  const [cementTotal, setCementTotal] = useState(0);
  const [detailsTotal, setDetailsTotal] = useState(0);
  const [workerTotal, setWorkerTotal] = useState(0);
  const [materialsTotal, setMaterialsTotal] = useState(0);
  const [azlTotal, setAzlTotal] = useState(0);
  const [transportTotal, setTransportTotal] = useState(0);
  const [repairTotal, setRepairTotal] = useState(0);
  const [woodTotal, setWoodTotal] = useState(0);
  const [roomsTotal, setRoomsTotal] = useState(0);
  const overTotal =
    tubesTotal +
    sandTotal +
    senTotal +
    cementTotal +
    detailsTotal +
    workerTotal +
    materialsTotal +
    azlTotal +
    transportTotal +
    repairTotal +
    woodTotal +
    roomsTotal;
  const mine = processBand.map((item) => {
    if (item.type === "tubes") {
      tubesValue.push(item.value);
    } else if (item.type === "sand") {
      sandValue.push(item.value);
    } else if (item.type === "worker") {
      workerValue.push(item.value);
    } else if (item.type === "sen") {
      senValue.push(item.value);
    } else if (item.type === "cement") {
      cementValue.push(item.value);
    } else if (item.type === "details") {
      detailsValue.push(item.value);
    } else if (item.type === "transport") {
      transportValue.push(item.value);
    } else if (item.type === "materials") {
      materialsValue.push(item.value);
    } else if (item.type === "repair") {
      repairValue.push(item.value);
    } else if (item.type === "azl") {
      azlValue.push(item.value);
    } else if (item.type === "wood") {
      woodValue.push(item.value);
    } else if (item.type === "rooms") {
      roomsValue.push(item.value);
    }
  });
  const sumTypeValue = () => {
    let sum = 0;
    for (let i = 0; i < tubesValue.length; i++) {
      sum += tubesValue[i];
    }
    setTubesTotal(sum);
  };
  useEffect(() => {
    sumTypeValue();
  });
  const sumSandValue = () => {
    let sum = 0;
    for (let i = 0; i < sandValue.length; i++) {
      sum += sandValue[i];
    }
    setSandTotal(sum);
  };
  useEffect(() => {
    sumSandValue();
  });
  const sumsenValue = () => {
    let sum = 0;
    for (let i = 0; i < senValue.length; i++) {
      sum += senValue[i];
    }
    setSenTotal(sum);
  };
  useEffect(() => {
    sumsenValue();
  });
  const sumcementValue = () => {
    let sum = 0;
    for (let i = 0; i < cementValue.length; i++) {
      sum += cementValue[i];
    }
    setCementTotal(sum);
  };
  useEffect(() => {
    sumcementValue();
  });
  const sumDetailsValue = () => {
    let sum = 0;
    for (let i = 0; i < detailsValue.length; i++) {
      sum += detailsValue[i];
    }
    setDetailsTotal(sum);
  };
  useEffect(() => {
    sumDetailsValue();
  });
  const sumWorkerValue = () => {
    let sum = 0;
    for (let i = 0; i < workerValue.length; i++) {
      sum += workerValue[i];
    }
    setWorkerTotal(sum);
  };
  useEffect(() => {
    sumWorkerValue();
  });
  const sumMaterialsValue = () => {
    let sum = 0;
    for (let i = 0; i < materialsValue.length; i++) {
      sum += materialsValue[i];
    }
    setMaterialsTotal(sum);
  };
  useEffect(() => {
    sumMaterialsValue();
  });
  const sumAzlValue = () => {
    let sum = 0;
    for (let i = 0; i < azlValue.length; i++) {
      sum += azlValue[i];
    }
    setAzlTotal(sum);
  };
  useEffect(() => {
    sumAzlValue();
  });
  const sumTransportValue = () => {
    let sum = 0;
    for (let i = 0; i < transportValue.length; i++) {
      sum += transportValue[i];
    }
    setTransportTotal(sum);
  };
  useEffect(() => {
    sumTransportValue();
  });
  const sumRepairValue = () => {
    let sum = 0;
    for (let i = 0; i < repairValue.length; i++) {
      sum += repairValue[i];
    }
    setRepairTotal(sum);
  };
  useEffect(() => {
    sumRepairValue();
  });
  const sumWoodValue = () => {
    let sum = 0;
    for (let i = 0; i < woodValue.length; i++) {
      sum += woodValue[i];
    }
    setWoodTotal(sum);
  };
  useEffect(() => {
    sumWoodValue();
  });
  const sumRoomsValue = () => {
    let sum = 0;
    for (let i = 0; i < roomsValue.length; i++) {
      sum += roomsValue[i];
    }
    setRoomsTotal(sum);
  };
  useEffect(() => {
    sumRoomsValue();
  });
  const fetchProcessTitle = async () => {
    try {
      const res = await axios.get(`https://api.albahren.com/api/process/${id}`);
      setProcessTitle(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchProcessValue = async () => {
    try {
      const res = await axios.get(
        `https://api.albahren.com/api/processDetailes/${id}`
      );
      setProcessBand(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProcessValue();
    fetchProcessTitle();
  });
  const fetchProcess = async (e) => {
    try {
      const res = await axios.get(`https://api.albahren.com/api/process/${id}`);
      setProcessData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const addIncomeProcess = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.put(
        `https://api.albahren.com/api/process/${id}`,
        {
          processIncome,
        }
      );
      res.status === 200 && toast.success("تم اضافه الوارد بنجاح");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProcess();
    addIncomeProcess();
  });
  return (
    <div className="processDetails">
      <div className="container loober">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <div className="header" key={processTitle._id}>
            <h2 className="headerTitle">اسم العمليه/ {processTitle.title}</h2>
            <h6 className="headerIndex">البيان العام للمصروفات</h6>
          </div>
          <div className="headerTablet">
            <table>
              <tr className="tabletHeader">
                <th className="band">البند</th>
                <th className="band">السعر</th>
              </tr>
              <tr>
                <td>مواسير</td>
                <td>{Math.round(tubesTotal)}</td>
              </tr>
              <tr>
                <td>رمل</td>
                <td>{Math.round(sandTotal)}</td>
              </tr>
              <tr>
                <td>سن</td>
                <td>{Math.round(senTotal)}</td>
              </tr>
              <tr>
                <td>اسمنت</td>
                <td>{Math.round(cementTotal)}</td>
              </tr>
              <tr>
                <td>نثريات</td>
                <td>{Math.round(detailsTotal)}</td>
              </tr>
              <tr>
                <td>مصناعيه</td>
                <td>{Math.round(workerTotal)}</td>
              </tr>
              <tr>
                <td>خامات</td>
                <td>{Math.round(materialsTotal)}</td>
              </tr>
              <tr>
                <td>عزل</td>
                <td>{Math.round(azlTotal)}</td>
              </tr>
              <tr>
                <td>غرف</td>
                <td>{Math.round(roomsTotal)}</td>
              </tr>
              <tr>
                <td>انتقالات مواقع</td>
                <td>{Math.round(transportTotal)}</td>
              </tr>
              <tr>
                <td>اعطال</td>
                <td>{Math.round(repairTotal)}</td>
              </tr>
              <tr>
                <td>خشب</td>
                <td>{Math.round(woodTotal)}</td>
              </tr>
              <tr className="tabletHeader">
                <th className="band">اجمالي العمليه</th>
                <th className="band">{Math.round(overTotal)}</th>
              </tr>
            </table>
          </div>
          {user.isAdmin === 1 && (
            <div className="processReport p-3">
              <div className="processReport-flex">
                <h1>مكسب العمليه</h1>
                {/* <!-- Button trigger modal --> */}
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  أضافه المبلغ الوارد
                </button>
                {/* <!-- Modal --> */}
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <label
                          class="color-black"
                          style={{ color: "black" }}
                          htmlFor="IncomeProcess"
                        >
                          المبلغ الوارد
                        </label>
                        <input
                          placeholder="ادخل المبلغ الوارد"
                          type="number"
                          id="IncomeProcess"
                          onChange={(e) => setProcessIncome(e.target.value)}
                        />
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={addIncomeProcess}
                        >
                          أضافه
                        </button>
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          أغلاق
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {processData.processIncome && (
                <>
                  <div className="processReport-flex">
                    <h2>الوارد</h2>
                    <span className="processReport-red">
                      {Math.round(processData.processIncome)}
                    </span>
                  </div>
                  <div className="processReport-flex">
                    <h2>المكسب</h2>
                    <span className="processReport-green">
                      {Math.round(processData.processIncome) -
                        Math.round(overTotal)}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
