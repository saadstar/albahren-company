import React, { useContext, useEffect, useState } from "react";
import "./save.css";
import axios from "axios";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { styled } from "@mui/system";
import { ShowImg } from "./ShowImg";
import { DeleteSave } from "./DeleteSave";
import { AuthContext } from "../../auth/authContext/authContext";
import { LoadingPage } from "../../Loading/LoadingPage";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { AddPrice } from "./AddPrice";

export const Save = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showImgOpen, setShowImgOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [fullValue, setFullValue] = useState();
  const [fullOutValue, setFullOutValue] = useState();
  const [search, setSearch] = useState("");
  const [showData, setShowData] = useState(undefined);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [outOpen, setOutOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const { user } = useContext(AuthContext);
  let totalArr = [];
  let totalOutArr = [];
  const filteredRecivedData = rowData.filter((item) => {
    return search === "" ? item : item.proccessName === search;
  });

  const totalValue = () => {
    filteredRecivedData.forEach((item) => {
      totalArr.push(item.inn);
    });
  };
  const totalValueFun = () => {
    let sum = 0;
    for (let i = 0; i < totalArr.length; i++) {
      sum += totalArr[i];
    }
    setFullValue(sum);
  };
  useEffect(() => {
    totalValue();
    totalValueFun();
  });
  const totalOutValue = () => {
    filteredRecivedData.forEach((item) => {
      totalOutArr.push(item.out);
    });
  };
  const totalOutValueFun = () => {
    let sum = 0;
    for (let i = 0; i < totalOutArr.length; i++) {
      sum += totalOutArr[i];
    }
    setFullOutValue(sum);
  };
  useEffect(() => {
    totalOutValue();
    totalOutValueFun();
  });
  const fetchData = async () => {
    try {
      const res = await axios.get("https://api.albahren.com/api/save");
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
      headerName: "اسم البيان",
      width: 200,
      editable: false,
    },
    {
      field: "out",
      headerName: "المصروف",
      width: 90,
      editable: false,
    },
    {
      field: "inn",
      headerName: "الوارد",
      width: 90,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "التاريخ",
      width: 120,
    },
    {
      field: "proccessName",
      headerName: "العمليه",
      width: 110,
    },
    {
      field: "filename",
      headerName: "ايصال العهده الماليه",
      width: 110,
      renderCell: (params) => {
        const showHandler = () => {
          if (window.scrollY !== 0) {
            window.scrollTo(0, window.scrollY === 0);
          }
          setShowData(params.row);
          setShowImgOpen(true);
        };
        return (
          <div className="actionWrapper">
            <button className="storeColumnButton" onClick={showHandler}>
              عرض البون
            </button>
          </div>
        );
      },
    },
    {
      field: "recived",
      headerName: "المستلم",
      width: 90,
      editable: false,
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
  const rows = filteredRecivedData.reverse().map((item) => {
    return {
      id: item._id,
      name: item.name,
      inn: item.inn,
      out: item.out,
      recived: item.recived,
      createdAt: item.createdAt.split("T")[0],
      filename: item.filename,
      entry: user.username,
      proccessName: item.proccessName,
    };
  });
  // style toolbar export button
  const StyledGridToolbarExport = styled(GridToolbarExport)(({ theme }) => ({
    color: "white",
  }));
  return (
    <div className="users">
      {rowData.length === 0 ? (
        <LoadingPage />
      ) : (
        <div className="main-marg">
          {outOpen === true ? (
            <Box className="headerBox">
              <Header title={"صرف مبلغ"} style={{ color: "#FFB801" }} />
            </Box>
          ) : (
            <Box className="headerBox">
              <Header title={"الخزنه"} style={{ color: "#FFB801" }} />
              <Header
                title={fullValue - fullOutValue}
                subtitle={"الرصيد الحالي"}
                style={{ color: "#FFB801" }}
              />
              <input
                type="search"
                className="searchHeader"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث باسم العمليه"
              />
            </Box>
          )}
          {!addOpen & !outOpen && (
            <Box className="headerBox">
              <button onClick={() => setOutOpen(!outOpen)}>صرف مبلغ</button>
              <button onClick={() => setAddOpen(!addOpen)}>إضافه مبلغ </button>
            </Box>
          )}
          {!addOpen & !outOpen && (
            <Box
              m="10px 0 0 0"
              height="75vh"
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
          )}
        </div>
      )}
      {!addOpen & !outOpen && (
        <Box className="headerBox">
          <Header
            title={fullOutValue}
            subtitle={"المصروف"}
            style={{ color: "#FFB801" }}
          />
          <Header
            title={fullValue}
            subtitle={"الوارد"}
            style={{ color: "#FFB801" }}
          />
        </Box>
      )}
      {addOpen && <AddPrice setAddOpen={setAddOpen} type="in" />}
      {outOpen && (
        <AddPrice setOutOpen={setOutOpen} type="out" outOpen={outOpen} />
      )}
      {showImgOpen && (
        <ShowImg setShowImgOpen={setShowImgOpen} showData={showData} />
      )}
      {deleteOpen && (
        <DeleteSave setDeleteOpen={setDeleteOpen} deleteUserId={deleteUserId} />
      )}
    </div>
  );
};
