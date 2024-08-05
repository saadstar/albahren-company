import React, { useContext, useEffect, useState } from "react";
import "../usersFeatures/user.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { MoveTwo } from "./MoveTwo";
import { ShowImg } from "./ShowImg";
import { MoveToOutStore } from "./MoveToOutStore";
import { DeleteStore } from "./DeleteStore";
import { AuthContext } from "../../auth/authContext/authContext";
import { LoadingPage } from "../../Loading/LoadingPage";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { toast } from "react-toastify";

export const Store = ({ exist, ar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showOpen, setShowOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [outOpen, setOutOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [rowData, setRowData] = useState([]);
  const [editData, setEditData] = useState(undefined);
  const [showData, setShowData] = useState(undefined);
  const existData = rowData.filter((item) => item.exist === exist);
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://api.albahren.com/api/store");
      setRowData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  });
  const columns = [
    {
      field: "name",
      headerName: "اسم العنصر",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: exist === 2 ? "أصل الكميه" : "الكميه",
    },
    {
      field: exist === 2 ? "updatedAt" : "createdAt",
      headerName: "التاريخ",
    },
    {
      field: "filename",
      headerName: "صورة البون",
      renderCell: (params) => {
        const showHandler = () => {
          if (window.scrollY != 0) {
            window.scrollTo(0, window.scrollY === 0);
          }
          setShowData(params.row);
          setShowOpen(true);
        };
        return (
          <div className="actionWrapper">
            <button className="storeColumnButton" onClick={showHandler}>
              عرض البون
            </button>
          </div>
        );
      },
    },
    exist === 1 && {
      field: "exist",
      headerName: "صرف فرعي",
      renderCell: (params) => {
        const editHandler = () => {
          if (window.scrollY != 0) {
            window.scrollTo(0, window.scrollY === 0);
          }
          setEditData(params.row);
          setEditOpen(true);
        };
        return (
          <div className="actionWrapper">
            <button className="storeColumnButton" onClick={editHandler}>
              صرف
            </button>
          </div>
        );
      },
    },
    exist === 1 && {
      field: "Action",
      headerName: "حذف",
      renderCell: (params) => {
        const deleteHandler = () => {
          if (window.scrollY != 0) {
            window.scrollTo(0, window.scrollY === 0);
          }
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
    exist === 2 && {
      field: "exist",
      headerName: "صرف نهائي",
      width: 100,
      renderCell: (params) => {
        const editHandler = () => {
          if (window.scrollY != 0) {
            window.scrollTo(0, window.scrollY === 0);
          }
          setEditData(params.row);
          setOutOpen(true);
        };
        return (
          <div className="actionWrapper">
            <button className="storeColumnButton" onClick={editHandler}>
              صرف نهائي
            </button>
          </div>
        );
      },
    },
    exist !== 1 && {
      field: "quantityOut",
      headerName: "الكميه",
      width: 90,
      editable: false,
    },
    exist !== 1 && {
      field: "nameOne",
      headerName: "المهندس المستلم",
      width: 120,
      editable: false,
    },
    exist !== 1 && {
      field: "nameTwo",
      headerName: "المقاول المستلم",
      width: 120,
      editable: false,
    },
    exist === 3 && {
      field: "driver",
      headerName: "السائق",
    },
    exist === 3 && {
      field: "return",
      headerName: "اعاده",
      width: 100,
      renderCell: (params) => {
        const retrunStore = async (e) => {
          try {
            e.preventDefault();
            const res = await axios.put(
              `https://api.albahren.com/api/store/${params.row.id}`,
              { exist: 1 }
            );
            res.status === 200 && toast.success("تمت الأعاده.");
          } catch (err) {
            console.log(err);
          }
        };
        return (
          <div className="actionWrapper">
            <button className="storeColumnButton" onClick={retrunStore}>
              أعاده للمخزن
            </button>
          </div>
        );
      },
    },
  ];
  const rows = existData.reverse().map((item) => {
    return {
      id: item._id,
      name: item.name,
      quantity: item.quantity,
      createdAt: item.createdAt.split("T")[0],
      filename: item.filename,
      entry: user.username,
      quantityOut: item.quantityOut,
      nameOne: item.nameOne,
      nameTwo: item.nameTwo,
      updatedAt: item.updatedAt.split("T")[0],
      driver: item.driver,
    };
  });
  
  return (
    <div className="users">
      {rowData.length === 0 ? (
        <LoadingPage />
      ) : (
        <div className="main-marg">
          <Box className="headerBox">
            <Header title={ar} style={{ color: "#FFB801" }} />
          </Box>
          <Box
            m="10px 0 0 0"
            height="75vh"
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
        </div>
      )}
      {showOpen && <ShowImg setShowOpen={setShowOpen} showData={showData} />}
      {editOpen && <MoveTwo setEditOpen={setEditOpen} editData={editData} />}
      {outOpen && (
        <MoveToOutStore setOutOpen={setOutOpen} editData={editData} />
      )}
      {deleteOpen && (
        <DeleteStore
          setDeleteOpen={setDeleteOpen}
          deleteUserId={deleteUserId}
        />
      )}
    </div>
  );
};
