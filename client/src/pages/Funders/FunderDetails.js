import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./funder.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddFunder } from "./AddFunder";
import { DeleteFunder } from "./DeleteFunder";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { AuthContext } from "../../auth/authContext/authContext";

export const FunderDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [addOpen, setAddOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://api.albahren.com/api/funderDetails/${id}`
      );
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
      width: 160,
      editable: false,
    },
    {
      field: "quantity",
      headerName: "الكميه",
      width: 100,
      editable: false,
    },
    {
      field: "price",
      headerName: "سعر الوحده",
      width: 100,
      editable: false,
    },
    {
      field: "recived",
      headerName: "المستلم",
      width: 120,
    },
    {
      field: "site",
      headerName: "الموقع",
      width: 100,
    },
    {
      field: "storeType",
      headerName: "المخزن",
      width: 100,
    },
    {
      field: "value",
      headerName: "السعر",
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "التاريخ",
      width: 120,
    },
    {
      field: "Action",
      headerName: "حذف",
      width: 50,
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
  const rows = rowData.reverse().map((item) => {
    return {
      id: item._id,
      name: item.name,
      quantity: item.quantity,
      createdAt: item.createdAt.split("T")[0],
      recived: item.recived,
      site: item.site,
      storeType: item.storeType,
      price: item.price,
      value: item.value,
      entry: user.username,
    };
  });
  return (
    <div className="users">
      <div className="main-marg">
        <Box className="headerBox">
          <Header
            title={addOpen === true ? `إضافه ممول` : "الممولين"}
            subtitle={`استكشف كل شركات التمويل هنا`}
          />
          <button onClick={() => setAddOpen(!addOpen)}>
            {addOpen === true ? "رجوع" : `إضافه شركه تمويل`}
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
            <AddFunder setAddOpen={setAddOpen} id={id} />
          </>
        )}
      </div>
      {deleteOpen && (
        <DeleteFunder
          setDeleteOpen={setDeleteOpen}
          deleteUserId={deleteUserId}
        />
      )}
    </div>
  );
};
