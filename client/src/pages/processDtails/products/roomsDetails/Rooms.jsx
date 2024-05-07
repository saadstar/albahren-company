import React, { useEffect, useState } from "react";
import { Menu } from "../../Menu/Menu";
import { DataGrid } from "@mui/x-data-grid";
import "../../../usersFeatures/user.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddRoom } from "./AddRoom";
import { DeleteRoom } from "./DeleteRoom";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";

export const Rooms = ({ type, ar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowData, setRowData] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const { id } = useParams();
  const FilteredData = rowData.filter((item) => {
    return item.type === type;
  });

  const columns = [
    {
      field: "note",
      headerName: "اسم البيان",
      width: 150,
      editable: false,
    },
    {
          field: "quantity",
          headerName: "الحديد",
          flex:1,
          editable: false,
        },
    {
          field: "precentage",
          headerName: "الاسمنت",
          flex:1,
          editable: false,
        },
    {
          field: "price",
          headerName: "السن",
          flex:1,
          editable: false,
        },
    {
          field: "rPrice",
          headerName: "الرمل",
          flex:1,
          editable: false,
        },
    {
          field: "mPrice",
          headerName: "المصناعيه",
          flex:1,
          editable: false,
        },
    {
          field: "aPrice",
          headerName: "العزل",
          flex:1,
          editable: false,
        },
    {
          field: "khPrice",
          headerName: "الغطاء",
          flex:1,
          editable: false,
        },
    {
          field: "other",
          headerName: "نثريات",
          flex:1,
          editable: false,
        },
    {
      field: "value",
      headerName: "اجمالي",
      width: 180,
    },
    {
      field: "createdAt",
      headerName: "التاريخ",
      width: 120,
    },
    {
      field: "Action",
      headerName: "حذف",
      width: 60,
      renderCell: (params) => {
        const deleteHandler = () => {
          setDeleteUserId(params.row.id);
          setDeleteOpen(true);
        };
        return (
          <div className="actionWrapper">
            <i
              class="fa-solid fa-trash"
              style={{ color: "red", fontSize: "20px" }}
              onClick={deleteHandler}
            ></i>
          </div>
        );
      },
    },
  ];
  const rows = FilteredData.reverse().map((item) => {
    return {
      id: item._id,
      note: item.note,
      quantity: item.quantity,
      precentage: item.precentage,
      value: item.value,
      other: item.other,
      price: item.price,
      rPrice: item.rPrice,
      mPrice: item.mPrice,
      aPrice: item.aPrice,
      khPrice: item.khPrice,      
      createdAt: item.createdAt.split("T")[0],
    };
  });
  const fetchRow = async () => {
    try {
      const res = await axios.get(
        `https://api.albahren.com/api/processDetailes/${id}`
      );
      setRowData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRow();
  });
  return (
     <div className="app">
      <Menu style={{ marginTop: "120px" }} />
      <main className="content">       
          <div className="users" style={{ marginTop: "190px" }}>
            <div className="main-marg">
              <Box className="headerBox">
                <Header title={addOpen === true ?`إضافه ${ar}`: ar} subtitle={`استكشف كل ${ar} هنا`} />
                <button
                  onClick={() => setAddOpen(!addOpen)}
                >{addOpen === true ?'رجوع':`إضافه ${ar}`}</button>
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
                  <AddRoom setAddOpen={setAddOpen} id={id} type={type} />
                </>
              )}
            </div>          
          </div>
      </main>
      {deleteOpen && (
        <DeleteRoom
          setDeleteOpen={setDeleteOpen}
          deleteUserId={deleteUserId}
        />
      )}
    </div>
  );
};
