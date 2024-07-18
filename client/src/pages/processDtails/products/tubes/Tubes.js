import React, { useEffect, useState } from "react";
import { Menu } from "../../Menu/Menu";
import {
  DataGrid,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddTubes } from "./AddTubes";
import { DeleteTubes } from "./DeleteTubes";
import "../../../usersFeatures/user.css";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";

export const Tubes = ({ type, ar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowData, setRowData] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [fullTotalPrice, setFullTotalPrice] = useState(0);
  const [fullTotalQuantity, setFullTotalQuantity] = useState(0);
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const totalArr = [];
  const totalQuantityArr = [];
  const FilteredData = rowData.filter((item) => {
    return item.type === type;
  });
  const searchFilteredData = FilteredData.filter((item) => {
    return search === "" ? item : item.other === search;
  });

  const totalValue = () => {
    searchFilteredData.forEach((item) => {
      if (item.value === undefined) {
        totalArr.push(0);
      } else {
        totalArr.push(item.value);
      }
    });
  };
  const totalValueFun = () => {
    let sum = 0;
    for (let i = 0; i < totalArr.length; i++) {
      sum += totalArr[i];
    }
    setFullTotalPrice(sum);
  };
  useEffect(() => {
    totalValue();
    totalValueFun();
  });
  const totalQuantityValue = () => {
    searchFilteredData.forEach((item) => {
      if (item.quantity === undefined) {
        totalQuantityArr.push(0);
      } else {
        totalQuantityArr.push(item.quantity);
      }
    });
  };
  const totalQuantityValueFun = () => {
    let sum = 0;
    for (let i = 0; i < totalQuantityArr.length; i++) {
      sum += totalQuantityArr[i];
    }
    setFullTotalQuantity(sum);
  };
  useEffect(() => {
    totalQuantityValue();
    totalQuantityValueFun();
  });
  const columns = [
    {
      field: "note",
      headerName: "اسم البيان",
      width: 250,
    },
    {
      field: "quantity",
      headerName: "الكميه",
      width: 100,
    },
    {
      field: "price",
      headerName: "سعر المتر",
      width: 100,
    },
    {
      field: "value",
      headerName: "اجمالي",
      width: 140,
    },
    {
      field: "createdAt",
      headerName: "التاريخ",
      width: 250,
    },
    type === "worker" && {
      field: "other",
      headerName: "الصنايعي",
      width: 100,
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
  const rows = searchFilteredData.reverse().map((item) => {
    return {
      id: item._id,
      note: item.note,
      quantity: item.quantity,
      price: item.price,
      value: item.value,
      other: item.other,
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
              <Header
                title={addOpen === true ? `إضافه ${ar}` : ar}
                subtitle={`استكشف كل ${ar} هنا`}
              />
              <button onClick={() => setAddOpen(!addOpen)}>
                {addOpen === true ? "رجوع" : `إضافه ${ar}`}
              </button>
            </Box>
            {/* <div class="d-flex pb-2" role="search">
          <input
    class="inputContainer"
    type="search"
    placeholder="أبحث باسم الصنايعي"
    aria-label="Search"
        onChange={(e) => setSearch(e.target.value)}
  />
</div> */}
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
                <DataGrid
                  rows={rows}
                  columns={columns}
                  components={{
                    Toolbar: () => (
                      <Box sx={{ color: "white" }}>
                        <GridToolbarExport sx={{ color: "white !important" }} />
                      </Box>
                    ),
                  }}
                />
              </Box>
            ) : (
              <>
                <AddTubes setAddOpen={setAddOpen} id={id} type={type} ar={ar} />
              </>
            )}
          </div>
          {!addOpen && (
            <Box className="headerBox">
              <Header
                title={Math.floor(fullTotalPrice)}
                subtitle={`الاجمالي`}
              />
              <Header
                title={Math.floor(fullTotalQuantity)}
                subtitle={`إجمالي الكميات`}
              />
            </Box>
          )}
        </div>
      </main>
      {deleteOpen && (
        <DeleteTubes
          setDeleteOpen={setDeleteOpen}
          deleteUserId={deleteUserId}
        />
      )}
    </div>
  );
};
