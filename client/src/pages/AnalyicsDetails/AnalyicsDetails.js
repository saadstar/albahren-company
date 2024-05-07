import React from 'react'
import "./analyicsDetails.css"
import { DataNum } from './DataNum';
import { Link, useParams } from 'react-router-dom';
import { Box } from "@mui/material";
import Header from "../../components/Header";

export const AnalyicsDetails = () => {
  const { id } = useParams();
  
  return (
    <div className="users">
      <div className="main-marg">
        <Box className="headerBox">
          <Header
            title={"تقارير العمليه"}
            subtitle={"استكشف فروق الاسعار الاوليه والنهائيه من هنا"}
          />
          <Link to={`/analyics/report/${id}`}>
            <button> التقرير الاول</button>
          </Link>
          <Link to={`/analyics/finalreport/${id}`}>
            <button> التقرير النهائي</button>
          </Link>
        </Box>
        <Box
          m="10px 0 0 0"
          border="1px solid #6E6C77"
          borderRadius={2}
          className="plans"
        >
          <DataNum dataNum={1} name="الأوليه" />
          <DataNum dataNum={2} name="الوسطي" />
          <DataNum dataNum={3} name="النهائيه" />
        </Box>
      </div>
    </div>
  );
}
