import React, { useEffect, useState } from "react";
import "./user.css";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteUser } from "./DeleteUser";
import axios from "axios";


export const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [rowData, setRowData] = useState([]);

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      renderCell: (params) => {
        return <img src={params.row.img || "./images/noImg.png"} alt="" className="tableAvatar"/>;
      },
    },
    {
      field: "username",
      headerName: "اسم المستخدم",
      flex:1,
    },
    {
      field: "firstName",
      headerName: "الاسم الاول",
      flex:1,
    },
    {
      field: "lastName",
      headerName: "الاسم الاخير",
      flex:1,
    },
    {
      field: "createdAt",
      headerName: "التاريح",
      flex:1,
    },
    {
      field: "status",
      headerName: "أدمن",
      flex:1,
      type: Boolean,
      renderCell: (params) => {
        return params.row.status === 1 ? (
          <i class="fa-solid fa-check" id="statusBtnActive"></i>
        ) : (
          <i class="fa-solid fa-xmark" id="statusBtnOffline"></i>
        );
      },
    },
    {
      field: "Action",
      headerName: "حذف",
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
  const rows = rowData.map((item) => {
    return {
      id: item._id,
      username: item.username,
      firstName: item.firstName,
      lastName: item.lastName,
      createdAt: item.createdAt.split("T")[0],
      img: item.img,
      status: item.isAdmin,
    };
  });
  const fetchData = async () => {
    try {
      const res = await axios.get("https://api.albahren.com/api/auth/");
      setRowData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [rowData.id]);
  return (
    <div className='users'>    
     <div className='main-marg' >
      <Box className='headerBox'>
        <Header title={"المستخدمين"} />        
      </Box>
     <Box
        m="10px 0 0 0"
        height="75vh"
        border="1px solid #6E6C77"
        borderRadius={2}
        sx={{
          "& .MuiDataGrid-root.MuiDataGrid-root--densityStandard.css-1kt8ah5-MuiDataGrid-root": {
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
        />
        </Box>
      {deleteOpen && (
        <DeleteUser
          setDeleteOpen={setDeleteOpen}
          slug="USER"
          colums={"colums"}
          deleteUserId={deleteUserId}
        />
        )}
      </div>
      </div>
  );
};
