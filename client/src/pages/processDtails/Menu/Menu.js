import React from "react";
import { Link, useParams } from "react-router-dom";
import "./menu.css";

export const Menu = () => {
  const { id } = useParams();
  const menuList = [
    {
      listHead: "المواسير",
      to: `/processDetails/tubes/${id}`,
    },
    {
      listHead: "الرمل",
      to: `/processDetails/sand/${id}`,
    },
    {
      listHead: "السن",
      to: `/processDetails/sen/${id}`,
    },
    {
      listHead: "الاسمنت",
      to: `/processDetails/cement/${id}`,
    },
    {
      listHead: "المصناعيه",
      to: `/processDetails/worker/${id}`,
    },
    {
      listHead: "نثريات",
      to: `/processDetails/details/${id}`,
    },
    {
      to: `/processDetails/materials/${id}`,
      listHead: "الخامات",
    },
    {
      listHead: "العوازل",
      to: `/processDetails/azl/${id}`,     
    },
    {
      listHead: "انتقالات المواقع",
      to: `/processDetails/transport/${id}`,     
    },
    {
      listHead: "الأعطال",
      to: `/processDetails/repair/${id}`,   
    },
    {
      listHead: "الأخشاب",
      to: `/processDetails/wood/${id}`,     
    },
    {
      listHead: "الغرف",
      to: `/processDetails/rooms/${id}`,     
    },
    {
      listHead: "المرتبات",
      to: `/processDetails/sallery/${id}`,     
    },
    {
      listHead: "التأمين",
      to: `/processDetails/workerInsurance/${id}`,     
      },
    {
      listHead: "التأمين الأبتدائي",
      to: `/processDetails/finalInsurance/${id}`,      
    },
    {
      listHead: "التأمين الأستحقاقي",
      to: `/processDetails/returnInsurance/${id}`,     
    },
    {
      listHead: "الربح الكلي",
      to: `/processRenvue/${id}`,    
    },
  ];
  
  return (
    <div className="processMenu">
      <div className="processmenuBarWrapper">
        <div className="menuItems">
          <Link to={`/process/${id}`}>
            <div className="menuItemHeader">
              <h3>البيان العام</h3>
            </div>
          </Link>
          {menuList.map((item, index) => (
            <div className="menuItemWrapper" key={index}>
              <Link to={item.to} >
                <div className="processmenuItemHeader">{item.listHead}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
