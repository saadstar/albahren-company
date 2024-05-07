import React, { useState,useEffect } from 'react';
import "../../../usersFeatures/user.css";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import { Menu } from "../../Menu/Menu";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AddRenvue } from './AddRenvue';

export const Renvue = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [processBand, setProcessBand] = useState([]);
    const [addOpen, setAddOpen] = useState(false);
     const [processData, setProcessData] = useState([]);
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
    woodTotal;
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
    const fetchProcess = async (e) => {
    try {
      const res = await axios.get(`https://api.albahren.com/api/process/${id}`);
      setProcessData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
      fetchProcessValue();
      fetchProcess();
  });

  return (
     <div className="app">
      <Menu style={{ marginTop: "120px" }} />
      <main className="content">
        <div className="users" style={{ marginTop: "190px" }}>
          <div className="main-marg">
             <Box className="headerBox">
              <Header
                title={addOpen === true ? `إضافه المبلغ الوارد للعمليه` :" الربح الكلي"}
                subtitle={`استكشف كل الارباح هنا`}
              />
              <button onClick={() => setAddOpen(!addOpen)}>
                {addOpen === true ? "رجوع" : `إضافه مبلغ الوارد`}
              </button>
            </Box>
                {addOpen === false ? (
              <Box
                m="10px 0 0 0"
                height="30vh"
                border="1px solid #6E6C77"
                borderRadius={2}
                sx={{
                  "& .MuiDataGrid-root.MuiDataGrid-root--densityStandard.css-1kt8ah5-MuiDataGrid-root":
                    {
                      border: "none",
                    },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: colors.greenAccent[500],
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.primary[500],
                    borderBottom: "1px solid #6E6C77",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.primary[500],
                  },
                  "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                  },
                }}
                          >
                               {processData.processIncome && (
                <>
                  <div style={{display:"flex",justifyContent:"space-around"}}>
                    <h2>الوارد</h2>
                    <span style={{color:"red",fontSize:"30px",fontWeight:"500"}}>
                      {Math.round(processData.processIncome)}
                    </span>
                  </div>
                  <div style={{display:"flex" ,justifyContent:"space-around"}}>
                    <h2>المكسب</h2>
                    <span style={{color:"green",fontSize:"30px",fontWeight:"500"}}>
                      {Math.round(processData.processIncome) -
                        Math.round(overTotal)}
                    </span>
                  </div>
                </>
                              )}
                               {!processData.processIncome && (
                <div style={{
                                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", fontWeight: "bold",
                              color:"red"}}>برجاء ادخال المبلغ الوارد للعمليه</div>
              )}                            
              </Box>
            ) : (
              <>
                <AddRenvue setAddOpen={setAddOpen} id={id} />
              </>
            )}         
          </div>
         
        </div>
      </main>     
    </div>
  )
}
