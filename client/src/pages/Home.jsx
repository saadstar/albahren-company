import React, { useEffect, useState } from 'react';
import "./home.css"
import { Box1 } from './Boxs/Box1';
import { ChartBox } from '../component/chartBox/ChartBox';
import {  chartDataUser,chartDataRenvue,chartDataProduct,chartDataConvension, barChartDataVisit, barChartDataRevnue } from '../component/data';
import { BarChartBox } from '../component/chartBox/BarChartBox';
import { BieChartBox } from '../component/chartBox/BieChartBox';
import { BigChart } from '../component/chartBox/BigChart';
import axios from 'axios';

export const Home = () => {
  const [users, setUsers] = useState([]);
  const getusers = async () => {
    try{
     const res = await axios.get("https://api.albahren.com/api/auth/");
      setUsers(res.data.length);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getusers();
  });
    return (
      <div className='home'>
        <div className='box box1'>
          <Box1/>
        </div>
        <div className='box box2'><ChartBox users={users} navi="/users" ar='المستخدمين' /></div>
        <div className='box box3'><ChartBox {...chartDataProduct} navi='/process' ar='العمليات'/></div>
        <div className='box box4'><BieChartBox/></div>
        <div className='box box5'><ChartBox {...chartDataConvension} navi='/save' ar='الخزنه' /></div>
        <div className='box box6'><ChartBox {...chartDataRenvue} navi='/store' ar='المخازن'/></div>
        <div className='box box7'><BigChart/></div>
        <div className='box box8'><BarChartBox {...barChartDataVisit} /></div>
        <div className='box box9'><BarChartBox {...barChartDataRevnue} /></div>
        </div>
  )
}
