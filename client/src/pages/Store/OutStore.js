import React, { useEffect, useState } from "react";
import "./store.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShowImg } from "./ShowImg";
import { toast } from "react-toastify";
import { LoadingPage } from "../../Loading/LoadingPage";

export const OutStore = () => {
  const [rowData, setRowData] = useState([]);
  const [showData, setShowData] = useState(undefined);
  const [showOpen, setShowOpen] = useState(false);
  const filteredData = rowData.filter((item) => item.exist === 3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api.albahren.com/api/store");
        setRowData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [rowData.id]);
  const columns = [
    {
      field: "name",
      headerName: "اسم العنصر",
      width: 190,
      editable: false,
    },
    {
      field: "quantityOut",
      headerName: "الكميه",
      width: 110,
      editable: false,
    },
    {
      field: "quantity",
      headerName: "أصل الكميه",
      width: 110,
      editable: false,
    },
    {
      field: "updatedAt",
      headerName: "التاريخ",
      width: 160,
    },
    {
      field: "nameOne",
      headerName: "المهندس المستلم",
      width: 160,
      editable: false,
    },
    {
      field: "nameTwo",
      headerName: "المقاول المستلم",
      width: 160,
      editable: false,
    },
    {
      field: "filename",
      headerName: "صورة البون",
      width: 120,
      renderCell: (params) => {
        const showHandler = () => {
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
  ];
  const rows = filteredData.reverse().map((item) => {
    return {
      id: item._id,
      name: item.name,
      quantity: item.quantity,
      quantityOut: item.quantityOut,
      updatedAt: item.updatedAt.split("T")[0],
      filename: item.filename,
      nameOne: item.nameOne,
      nameTwo: item.nameTwo,
      driver: item.driver,
    };
  });
  return (
    <div className="store">
      <nav className="full-width mb-3">
        <div className="d-flex">
          <Link to="/store" style={{ textDecoration: "none" }}>
            <h1>المخزن الرئيسي</h1>
          </Link>
          <Link to="/store" style={{ textDecoration: "none" }}>
            <h1>المخزن الفرعي</h1>
          </Link>
          <Link to="/outStore" style={{ textDecoration: "none" }}>
            <h1>المنصرف</h1>
          </Link>
        </div>
      </nav>
      <div className="">
        <div className="storeHeader">
          <h1>المنصرف </h1>
        </div>
        {filteredData.length === 0 ? (
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
      {showOpen && <ShowImg setShowOpen={setShowOpen} showData={showData} />}
    </div>
  );
};
