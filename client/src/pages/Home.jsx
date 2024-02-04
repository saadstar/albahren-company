import React from 'react';
import "./home.css"
import { Box1 } from './Boxs/Box1';
import { ChartBox } from '../component/chartBox/ChartBox';
import {  chartDataUser,chartDataRenvue,chartDataProduct,chartDataConvension, barChartDataVisit, barChartDataRevnue } from '../component/data';
import { BarChartBox } from '../component/chartBox/BarChartBox';
import { BieChartBox } from '../component/chartBox/BieChartBox';
import { BigChart } from '../component/chartBox/BigChart';

export const Home = () => {
    return (
      <div className='home'>
        <div className='box box1'>
          <Box1/>
        </div>
        <div className='box box2'><ChartBox {...chartDataUser} navi="/users" /></div>
        <div className='box box3'><ChartBox {...chartDataProduct} /></div>
        <div className='box box4'><BieChartBox/></div>
        <div className='box box5'><ChartBox {...chartDataConvension} /></div>
        <div className='box box6'><ChartBox {...chartDataRenvue} /></div>
        <div className='box box7'><BigChart/></div>
        <div className='box box8'><BarChartBox {...barChartDataVisit} /></div>
        <div className='box box9'><BarChartBox {...barChartDataRevnue} /></div>
        </div>
  )
}
