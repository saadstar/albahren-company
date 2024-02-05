import React, { useContext, useEffect, useState } from "react";
import "./store.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { AddStore } from "./AddStore";
import { MoveTwo } from "./MoveTwo";
import { ShowImg } from "./ShowImg";
import { Out } from "./Out";
import { Link } from "react-router-dom";
import { DeleteStore } from "./DeleteStore";
import { AuthContext } from "../../auth/authContext/authContext";

export const Store = ({ type }) => {
  const [addOpen, setAddOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [outOpen, setOutOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [exist, setExist] = useState(1);
  const [rowData, setRowData] = useState([]);
  const [editData, setEditData] = useState(undefined);
  const [showData, setShowData] = useState(undefined);
  const existData = rowData.filter((item) => item.exist === 1);
  const ExistTwoData = rowData.filter((item) => item.exist === 2);
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
      width: 220,
      editable: false,
    },
    {
      field: "quantity",
      headerName: "الكميه",
      width: 80,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "التاريخ",
      width: 130,
    },
    {
      field: "filename",
      headerName: "صورة البون",
      width: 120,
      renderCell: (params) => {
        const showHandler = () => {
          if (window.scrollY != 0) {
            window.scrollTo(0, window.scrollY === 0);
          }
          setShowData(params.row);
          setShowOpen(true);
        };
        return (
          <button
            style={{ cursor: "pointer" }}
            className="btn btn-outline-primary"
            onClick={showHandler}
          >
            عرض الصوره
          </button>
        );
      },
    },
    {
      field: "exist",
      headerName: "صرف فرعي",
      width: 80,
      renderCell: (params) => {
        const editHandler = () => {
          if (window.scrollY != 0) {
            window.scrollTo(0, window.scrollY === 0);
          }
          setEditData(params.row);
          setEditOpen(true);
        };
        return (
          <div className="action">
            <button className="storeActionButton" onClick={editHandler}>
              صرف
            </button>
          </div>
        );
      },
    },
    {
      field: "Action",
      headerName: "حذف",
      width: 60,
      renderCell: (params) => {
        const deleteHandler = () => {
          if (window.scrollY != 0) {
            window.scrollTo(0, window.scrollY === 0);
          }
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
      width: 100,
      editable: false,
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
    };
  });
  const existTwoColumns = [
    {
      field: "name",
      headerName: "اسم العنصر",
      width: 190,
      editable: false,
    },
    {
      field: "quantityOut",
      headerName: "الكميه",
      width: 90,
      editable: false,
    },
    {
      field: "quantity",
      headerName: "أصل الكميه",
      width: 90,
      editable: false,
    },
    {
      field: "updatedAt",
      headerName: "التاريخ",
      width: 120,
    },
    {
      field: "nameOne",
      headerName: "المهندس المستلم",
      width: 120,
      editable: false,
    },
    {
      field: "nameTwo",
      headerName: "المقاول المستلم",
      width: 120,
      editable: false,
    },
    {
      field: "filename",
      headerName: "صورة البون",
      width: 120,
      renderCell: (params) => {
        const showHandler = () => {
          if (window.scrollY != 0) {
            window.scrollTo(0, window.scrollY === 0);
          }
          setShowData(params.row);
          setShowOpen(!showOpen);
        };
        return (
          <button
            style={{ cursor: "pointer" }}
            className="btn btn-outline-primary"
            onClick={showHandler}
          >
            عرض الصوره
          </button>
        );
      },
    },
    {
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
          <div className="action">
            <button className="storeActionButton" onClick={editHandler}>
              صرف نهائي
            </button>
          </div>
        );
      },
    },
    {
      field: "entry",
      headerName: "المدخل",
      width: 50,
      editable: false,
    },
  ];
  const existTwoRows = ExistTwoData.reverse().map((item) => {
    return {
      id: item._id,
      name: item.name,
      quantity: item.quantity,
      quantityOut: item.quantityOut,
      updatedAt: item.updatedAt.split("T")[0],
      filename: item.filename,
      nameOne: item.nameOne,
      nameTwo: item.nameTwo,
      entry: user.username,
    };
  });
  return (
    <div className="store">
      <nav className="full-width mb-3">
        <div className="d-flex">
          <h1 onClick={() => setExist(1)}>المخزن الرئيسي</h1>
          <h1 onClick={() => setExist(2)}>المخزن الفرعي</h1>
          <Link to="/outStore" style={{ textDecoration: "none" }}>
            <h1 onClick={() => setExist(3)}>المنصرف</h1>
          </Link>
        </div>
      </nav>
      <div className="">
        <div className="storeHeader">
          {exist === 1 ? <h1>المخزن الرئيسي</h1> : <h1>المخزن الفرعي</h1>}
          {exist === 1 && (
            <button className="" onClick={() => setAddOpen(!addOpen)}>
              أضافه عنصر
            </button>
          )}
        </div>
        {rowData.length === 0 ? (
          <div class="">لا يوجد عناصر</div>
        ) : (
          <div className="dataTable">
            <DataGrid
              className="dataGrid"
              rows={exist === 1 ? rows : existTwoRows}
              columns={exist === 1 ? columns : existTwoColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 99,
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
      {addOpen && <AddStore setAddOpen={setAddOpen} />}
      {editOpen && <MoveTwo setEditOpen={setEditOpen} editData={editData} />}
      {showOpen && <ShowImg setShowOpen={setShowOpen} showData={showData} />}
      {outOpen && <Out setOutOpen={setOutOpen} editData={editData} />}
      {deleteOpen && (
        <DeleteStore
          setDeleteOpen={setDeleteOpen}
          deleteUserId={deleteUserId}
        />
      )}
    </div>
  );
};
