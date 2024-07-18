import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Menu } from "../../Menu/Menu";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { styled } from "@mui/system";
import { AddDetails } from "./AddDetails";
import { DeleteDetails } from "./DeleteDetails";
import "../../../usersFeatures/user.css";
import { AuthContext } from "../../../../auth/authContext/authContext";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";

export const Details = ({ sort, ar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      flex: 1,
    },
    {
      field: "price",
      headerName: "المدفوع",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "التاريخ",
      flex: 1,
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
  // style toolbar export button
  const StyledGridToolbarExport = styled(GridToolbarExport)(({ theme }) => ({
    color: "white",
  }));
  return (
    <div className="app">
      <Menu style={{ marginTop: "120px" }} />
      <main className="content">
        <div className="users" style={{ marginTop: "190px" }}>
          <div className="main-marg">
            <Box className="headerBox">
              <Header
                title={addOpen === true ? `إضافه ${ar}` : ar}
                subtitle={`استكشف كل ${ar} هنا`}
              />
              <button onClick={() => setAddOpen(!addOpen)}>
                {addOpen === true ? "رجوع" : `إضافه ${ar}`}
              </button>
            </Box>
            {addOpen === false ? (
              <Box
                m="10px 0 0 0"
                height="70vh"
                border="1px solid #6E6C77"
                borderRadius={2}
                sx={{
                  "& .MuiDataGrid-root.MuiDataGrid-root--densityStandard.css-1kt8ah5-MuiDataGrid-root":
                    {
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
                  components={{
                    Toolbar: () => (
                      <GridToolbarContainer>
                        <StyledGridToolbarExport />
                      </GridToolbarContainer>
                    ),
                  }}
                />
              </Box>
            ) : (
              <>
                <AddDetails setAddOpen={setAddOpen} id={id} sort={sort} />
              </>
            )}
          </div>
          {!addOpen && (
            <Box className="headerBox">
              <Header title={fullTotalPrice} subtitle={`الاجمالي`} />
            </Box>
          )}
        </div>
      </main>
      {deleteOpen && (
        <DeleteDetails
          setDeleteOpen={setDeleteOpen}
          deleteUserId={deleteUserId}
        />
      )}
    </div>
  );
};
