import React from 'react'
import "./analyicsDetails.css"
import { DataNum } from './DataNum';
import { Link, useParams } from 'react-router-dom';

export const AnalyicsDetails = () => {
  const { id } = useParams();
  
  return (
    <div class="analyicsDetails">
      <div class="">
        <div class="analyics-main-heading">
          <h2>تحليلات اسعار العمليه: </h2>
        </div>
        <div class="plans">
          <DataNum dataNum={1} name="الأوليه" />
          <DataNum dataNum={2} name="الوسطه" />
          <DataNum dataNum={3} name="النهائيه" />
        </div>
        <Link to={`/analyics/report/${id}`} class="contact-link">
          التقرير الاول
        </Link>
        <Link to={`/analyics/finalreport/${id}`} class="contact-link">
          التقرير النهائي
        </Link>
      </div>
    </div>
  );
}
