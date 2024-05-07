import React, { useEffect, useState } from "react";
import axios from "axios";
import "../usersFeatures/user.css";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { AddCar } from "./AddCar";

export const Car = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [carData, setCarData] = useState([]);
  const [addOpen, setAddOpen] = useState(false);

  const fetchCar = async () => {
    try {
      const res = await axios.get("https://api.albahren.com/api/car");
      setCarData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCar();
  });
  const columns = [
    {
      field: "name",
      headerName: "سائق السياره",
      flex: 1,
    },
    {
      field: "price",
      headerName: "سعر البنزين",
      flex: 1,
    },
    {
      field: "km",
      headerName: " الكيلومتر",
      flex: 1,
    },
    {
      field: "oil",
      headerName: "الزيت",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "التاريخ",
      flex: 1,
    },
  ];
  const rows = carData.reverse().map((item) => {
    return {
      id: item._id,
      name: item.name,
      price: item.price,
      km: item.km,
      oil: item.oil,
      createdAt: item.createdAt.split("T")[0],
    };
  });
  return (
    <div className="users">
      <div className="main-marg">
        <Box className="headerBox">
          <Header
            title={addOpen === true ? `إضافه تحرك` : "السياره"}
            subtitle={`استكشف كل تحرك السيارات هنا`}
          />
          <button onClick={() => setAddOpen(!addOpen)}>
            {addOpen === true ? "رجوع" : `إضافه تحرك`}
          </button>
        </Box>
        {addOpen === false ? (
          <Box
            m="10px 0 0 0"
            height="70vh"
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
            <DataGrid rows={rows} columns={columns} />
          </Box>
        ) : (
          <>
            <AddCar setAddOpen={setAddOpen} />
          </>
        )}
      </div>
    </div>
  );
};
