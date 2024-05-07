import React, { useEffect, useState } from "react";
import axios from "axios";
import { AddSallery } from "./AddSallery";
import "../usersFeatures/user.css";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";

export const Sallery = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [salleryData, setSalleryData] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
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

  const columns = [
    {
      field: "name",
      headerName: "الاسم ",
      flex: 1,
    },
    {
      field: "role",
      headerName: "الوظيفه",
      flex: 1,
    },
    {
      field: "salleryNum",
      headerName: "المرتب",
      flex: 1,
    },
    {
      field: "added",
      headerName: "الحوافز",
      flex: 1,
    },
    {
      field: "site",
      headerName: "الموقع",
      flex: 1,
    },
    {
      field: "note",
      headerName: "ملاحظات",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "التاريخ",
      flex: 1,
    },
  ];
  const rows = salleryData.reverse().map((item) => {
    return {
      id: item._id,
      name: item.name,
      role: item.role,
      salleryNum: item.salleryNum,
      added: item.added,
      site: item.site,
      note: item.note,
      createdAt: item.createdAt.split("T")[0],
    };
  });
  return (
    <div className="users">
      <div className="main-marg">
        <Box className="headerBox">
          <Header
            title={addOpen === true ? `صرف مرتب` : "المرتبات"}
            subtitle={`استكشف كل  مرتبات الموظفين هنا`}
          />
          <button onClick={() => setAddOpen(!addOpen)}>
            {addOpen === true ? "رجوع" : `صرف مرتب`}
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
            <AddSallery setAddOpen={setAddOpen} />
          </>
        )}
      </div>
    </div>
  );
};
