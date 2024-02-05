import React, { useEffect, useState } from "react";
import "../tubes/tubes.css";
import { Menu } from "../../Menu/Menu";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddInsurance } from "./AddInsurance";
import { DeleteInsurance } from "./DeleteInsurance";

export const Insurance = ({ type, ar }) => {
  const [rowData, setRowData] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const { id } = useParams();
  const inuranceFilteredData = rowData.filter((item) => item.type === type);
  console.log(inuranceFilteredData);

  const columns = [
    {
      field: "note",
      headerName: "اسم البيان",
      width: 250,
      editable: false,
    },
    type !== "returnInsurance" && {
      field: "quantity",
      headerName: type === "workerInsurance" ? "الدفعه" : "خطاب الضمان",
      width: 120,
      editable: false,
    },
    {
      field: "price",
      headerName: "المبلغ",
      type: "number",
      width: 120,
      editable: false,
    },
    type === "finalInsurance" && {
      field: "other",
      headerName: "نوع التأمين",
      width: 120,
      editable: false,
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
  const rows = rowData.reverse().map((item) => {
    return {
      id: item._id,
      note: item.note,
      quantity: item.quantity,
      price: item.price,
      other: item.other,
      createdAt: item.createdAt.split("T")[0],
    };
  });
  const fetchRow = async () => {
    try {
      const res = await axios.get(
        `https://api.albahren.com/api/processDetailes/${id}`
      );
      const filteredData = res.data.filter((item) => {
        return item.type === type;
      });
      setRowData(filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRow();
  });
  return (
    <div className="tubes">
      <div className="container loober">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <div className="tubesHeader">
            <h1>{ar}</h1>
            <button className="" onClick={() => setAddOpen(!addOpen)}>
              أضافه عنصر
            </button>
          </div>
          {rowData.length === 0 ? (
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
                      pageSize: 20,
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
        </div>
      </div>
      {addOpen && <AddInsurance setAddOpen={setAddOpen} id={id} type={type} />}
      {deleteOpen && (
        <DeleteInsurance
          setDeleteOpen={setDeleteOpen}
          deleteUserId={deleteUserId}
        />
      )}
    </div>
  );
};
