import React, { useEffect, useState } from "react";
import { Menu } from "./Menu/Menu";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";

export const ProcessDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [processBand, setProcessBand] = useState([]);
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
  const salleryValue = [];
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
  const [salleryTotal, setSalleryTotal] = useState(0);
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
    roomsTotal +
    salleryTotal;
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
    } else if (item.type === "sallery") {
      salleryValue.push(item.value);
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
   const sumSalleryValue = () => {
     let sum = 0;
     for (let i = 0; i < salleryValue.length; i++) {
       sum += salleryValue[i];
     }
     setSalleryTotal(sum);
   };
   useEffect(() => {
     sumSalleryValue();
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
  const tabletData = [
    {
      id: "1",
      band: "المواسير",
      price: Math.round(tubesTotal),
    },
    {
      id: "2",
      band: "الرمل",
      price: Math.round(sandTotal),
    },
    {
      id: "3",
      band: "السن",
      price: Math.round(senTotal),
    },
    {
      id: "4",
      band: "الاسمنت",
      price: Math.round(cementTotal),
    },
    {
      id: "5",
      band: "النثريات",
      price: Math.round(detailsTotal),
    },
    {
      id: "6",
      band: "المصناعيه",
      price: Math.round(workerTotal),
    },
    {
      id: "7",
      band: "الخامات",
      price: Math.round(materialsTotal),
    },
    {
      id: "8",
      band: "العوازل",
      price: Math.round(azlTotal),
    },
    {
      id: "9",
      band: "الانتقالات",
      price: Math.round(transportTotal),
    },
    {
      id: "10",
      band: "الأعطال",
      price: Math.round(repairTotal),
    },
    {
      id: "11",
      band: "الأخشاب",
      price: Math.round(woodTotal),
    },
    {
      id: "12",
      band: "الغرف",
      price: Math.round(roomsTotal),
    },
    {
      id: "13",
      band: "المرتبات",
      price: Math.round(salleryTotal),
    },
  ];
  const columns = [
    {
      field: "band",
      headerName: "البند",
      flex: 1,
    },
    {
      field: "price",
      headerName: "المصاريف",
      flex: 1,
    },
  ];
  const rows = tabletData.map((item) => {
    return {
      id: item.id,
      band: item.band,
      price: item.price,
    };
  });
  return (
    <div className="app">
      <Menu />
      <div className="content">
        <div style={{ margin: "200px 10px 0px 10px" }}>
          <Box className="headerBox">
            <Header
              title={"البيان العام للمصروفات"}
              subtitle={processTitle.title}
            />
          </Box>
          <Box
            m="10px 0 0 0"
            height="60vh"
            border="1px solid #6E6C77"
            borderRadius={2}
            width="65vw"
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
            <DataGrid rows={rows} columns={columns} />
          </Box>
          <Box className="headerBox">
            <Header
              subtitle={"إجمالي مصروفات العمليه"}
              title={Math.round(overTotal)}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};
