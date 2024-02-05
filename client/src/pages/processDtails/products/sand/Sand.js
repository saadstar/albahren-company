import React, { useEffect, useState } from "react";
import "../tubes/tubes.css";
import { Menu } from "../../Menu/Menu";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddSand } from "./AddSand";
import { DeleteSand } from "./DeleteSand";

export const Sand = ({ type, ar }) => {
  const [rowData, setRowData] = useState([]);
  const filterData = rowData.filter((item) => {
    return item.type === type;
  });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const { id } = useParams();
  const totalArr = [];
  const totalQuantityArr = [];
  const [fullTotalPrice, setFullTotalPrice] = useState(0);
  const [fullTotalQuantity, setFullTotalQuantity] = useState(0);

  const totalValue = () => {
    filterData.forEach((item) => {
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
    console.log(fullTotalPrice);
  };
  useEffect(() => {
    totalValue();
    totalValueFun();
  }, [totalArr]);
  const totalQuantityValue = () => {
    filterData.forEach((item) => {
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
  }, [totalQuantityArr]);
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
      width: 150,
      editable: false,
    },
    {
      field: "amount",
      headerName: type === "sand" ? "طول المواسير" : "عدد الغرف",
      width: 100,
      editable: false,
    },
    {
      field: "quantity",
      headerName: type === "cement" ? "الاسمنت بالطن" : `كميه ${ar}`,
      width: 100,
      editable: false,
    },
    {
      field: "price",
      headerName: type === "cement" ? `سعر طن ${ar}` : ` سعر متر ${ar}`,
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "precentge",
      headerName: `نسبه ${ar}`,
      type: "number",
      width: 100,
      editable: false,
    },
    {
      field: "value",
      headerName: `أجمالي سعر ${ar}`,
      width: 150,
    },
    {
      field: "createdAt",
      headerName: ` التاريخ`,
      width: 180,
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
  ];
  const rows = filterData.reverse().map((item) => {
    return {
      id: item._id,
      note: item.note,
      quantity: item.quantity,
      price: item.price,
      amount: item.precentage,
      value: item.value,
      precentge: item.quantity / item.precentage,
      createdAt: item.createdAt.split("T")[0],
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
              {`أضافه ${ar}`}
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
                <h2>{`اجمالي الكميات ${
                  type === "cement" ? "بالطن" : "بالمتر"
                }: ${fullTotalQuantity}`}</h2>
                <h2>{`اجمالي السعر: ${fullTotalPrice}`}</h2>
              </div>
            </div>
          )}
        </div>
      </div>
      {addOpen && (
        <AddSand setAddOpen={setAddOpen} id={id} type={type} ar={ar} />
      )}
      {deleteOpen && (
        <DeleteSand setDeleteOpen={setDeleteOpen} deleteUserId={deleteUserId} />
      )}
    </div>
  );
};
