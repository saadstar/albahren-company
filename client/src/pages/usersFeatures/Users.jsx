import React, { useEffect, useState } from "react";
import "./user.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteUser } from "./DeleteUser";
import axios from "axios";

export const Users = () => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [rowData, setRowData] = useState([]);

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 90,
      renderCell: (params) => {
        return <img src={params.row.img || "./noImg.png"} alt="" />;
      },
    },
    {
      field: "username",
      headerName: "اسم المستخدم",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "firstName",
      headerName: "الاسم الاول",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "الاسم الاخير",
      width: 150,
    },

    {
      field: "createdAt",
      headerName: "التاريح",
      width: 160,
    },
    {
      field: "status",
      headerName: "أدمن",
      width: 70,
      type: Boolean,
      renderCell: (params) => {
        return params.row.status === 1 ? (
          <i class="fa-solid fa-check" id="correct"></i>
        ) : (
          <i id="wrong" class="fa-solid fa-xmark"></i>
        );
      },
    },
    {
      field: "Action",
      headerName: "حذف",
      width: 200,
      renderCell: (params) => {
        const deleteHandler = () => {
          setDeleteUserId(params.row.id);
          setDeleteOpen(true);
        };
        return (
          <div className="action">
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
    <div className="users">
      <div className="info">
        <h1>المستخدمين</h1>
      </div>
      <div className="dataTable">
        <DataGrid
          className="dataGrid"
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
        />
      </div>
      {deleteOpen && (
        <DeleteUser
          setDeleteOpen={setDeleteOpen}
          slug="USER"
          colums={"colums"}
          deleteUserId={deleteUserId}
        />
      )}
    </div>
  );
};
