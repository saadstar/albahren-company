import React, { useEffect, useState } from "react";
import "../tubes/tubes.css";
import { Menu } from "../../Menu/Menu";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoadingPage } from "../../../../Loading/LoadingPage";
import { AddRoom } from "./AddRoom";
import { DeleteRoom } from "./DeleteRoom";

export const Rooms = ({ type, ar }) => {
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
    <div className="tubes">
      <div className="container loober">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <div className="tubesHeader">
            <h1>{ar}</h1>
            <button className="" onClick={() => setAddOpen(!addOpen)}>
              أضافه {ar}
            </button>
          </div>
          {rowData.length === 0 ? (
            <LoadingPage />
          ) : (
            <div className="dataTable">
              <DataGrid
                className="dataGrid"
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 90,
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
      {addOpen && <AddRoom setAddOpen={setAddOpen} id={id} type={type} />}
      {deleteOpen && (
        <DeleteRoom
          setDeleteOpen={setDeleteOpen}
          deleteUserId={deleteUserId}
        />
      )}
    </div>
  );
};
