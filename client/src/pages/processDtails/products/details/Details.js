import React, { useState, useEffect, useContext } from "react";
import "../tubes/tubes.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Menu } from "../../Menu/Menu";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AddDetails } from "./AddDetails";
import { DeleteDetails } from "./DeleteDetails";
import { AuthContext } from "../../../../auth/authContext/authContext";

export const Details = ({ sort, ar }) => {
  const [rowData, setRowData] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [fullTotalPrice, setFullTotalPrice] = useState(0);
  const { id } = useParams();
  const totalArr = [];
  const FilteredData = rowData.filter((item) => item.type === sort);
  const { user } = useContext(AuthContext);

  const totalValue = () => {
    FilteredData.forEach((item) => {
      if (item.price === undefined) {
        totalArr.push(0);
      } else {
        totalArr.push(item.price);
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
  }, [totalArr]);
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
  const columns = [
    {
      field: "note",
      headerName: "اسم البيان",
      width: 250,
      editable: false,
    },
    {
      field: "price",
      headerName: "المدفوع",
      width: 100,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "التاريخ",
      width: 150,
      editable: true,
    },
    {
      field: "Action",
      headerName: "حذف",
      width: 100,
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
      width: 200,
      editable: false,
    },
  ];
  const rows = FilteredData.reverse().map((item) => {
    return {
      id: item._id,
      note: item.note,
      price: item.price,
      value: item.value,
      createdAt: item.createdAt.split("T")[0],
      entry: user.username,
    };
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
              أضافه عنصر جديد
            </button>
          </div>
          {rowData.length === 0 ? (
            <div class="">لا يوجد عناصر </div>
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
              <div className="sum">
                <h2>{`ألاجمالي: ${fullTotalPrice}`}</h2>
              </div>
            </div>
          )}
        </div>
      </div>
      {addOpen && <AddDetails setAddOpen={setAddOpen} id={id} sort={sort} />}
      {deleteOpen && (
        <DeleteDetails
          setDeleteOpen={setDeleteOpen}
          deleteUserId={deleteUserId}
        />
      )}
    </div>
  );
};
