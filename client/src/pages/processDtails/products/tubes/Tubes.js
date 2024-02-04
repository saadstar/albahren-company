import React, { useEffect, useState } from "react";
import "./tubes.css";
import { Menu } from "../../Menu/Menu";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddTubes } from "./AddTubes";
import { DeleteTubes } from "./DeleteTubes";

export const Tubes = ({ type }) => {
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
      editable: false,
    },
    {
      field: "quantity",
      headerName: "الكميه",
      width: 120,
      editable: false,
    },
    {
      field: "price",
      headerName: "سعر المتر",
      type: "number",
      width: 120,
      editable: true,
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
  const WorkerColumns = [
    {
      field: "note",
      headerName: "اسم البيان",
      width: 250,
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
      headerName: "سعر المتر",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "other",
      headerName: "الصنايعي",
      width: 150,
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
        `http://localhost:3500/api/processDetailes/${id}`
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
            <h1>{type === "tubes" ? "مواسير" : "مصناعيه"}</h1>
            <button className="" onClick={() => setAddOpen(!addOpen)}>
              أضافه {type === "tubes" ? "مواسير" : "مصناعيه"}
            </button>
          </div>
          <div class="d-flex pb-2" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="أبحث بالعنصر"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button class="btn btn-success" type="submit">
              أبحث
            </button>
          </div>
          {rowData.length === 0 ? (
            <div class="">لا يوجد عناصر</div>
          ) : (
            <div className="dataTable">
              <DataGrid
                className="dataGrid"
                rows={rows}
                columns={type === "tubes" ? columns : WorkerColumns}
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
              <div className="sum">
                <h2>{`اجمالي الكميات بالمتر: ${Math.round(
                  fullTotalQuantity
                )}`}</h2>
                <h2>{`اجمالي السعر: ${Math.round(fullTotalPrice)}`}</h2>
              </div>
            </div>
          )}
        </div>
      </div>
      {addOpen && <AddTubes setAddOpen={setAddOpen} id={id} type={type} />}
      {deleteOpen && (
        <DeleteTubes
          setDeleteOpen={setDeleteOpen}
          deleteUserId={deleteUserId}
        />
      )}
    </div>
  );
};
