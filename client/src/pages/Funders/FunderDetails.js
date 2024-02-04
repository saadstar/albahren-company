import React, { useState, useEffect, useContext } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./funder.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddFunder } from "./AddFunder";
import { DeleteFunder } from "./DeleteFunder";
import { AuthContext } from "../../auth/authContext/authContext";

export const FunderDetails = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [search, setSearch] = useState("");
  const filtredData = rowData.filter((item) =>
    search === "" ? item : item.name === search
  );
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3500/api/funderDetails/${id}`
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
    {
      field: "entry",
      headerName: "المدخل",
      width: 40,
    },
  ];
  const rows = filtredData.reverse().map((item) => {
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
    <div className="contentContainer">
      <div className="funderHeader d-flex gap-4 mb-2">
        <h1>الممولين</h1>
        <button
          className="border-raduis-2 fw-bold"
          onClick={() => setAddOpen(!addOpen)}
        >
          أضافه عنصر
        </button>
      </div>
      <div
        class="d-flex mb-4 align-center justify-content-center gap-2"
        role="search"
      >
        <input
          class="form-control w-50 me-2 p-2"
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="ابحث باسم العنصر"
          aria-label="Search"
        />
        <button type="button" class="btn btn-light">
          بحث
        </button>
      </div>
      {filtredData.length === 0 ? (
        <div class="">لا يوجد عناصر</div>
      ) : (
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
      )}
      {addOpen && <AddFunder setAddOpen={setAddOpen} id={id} />}
      {deleteOpen && (
        <DeleteFunder
          setDeleteOpen={setDeleteOpen}
          deleteUserId={deleteUserId}
        />
      )}
    </div>
  );
};
