import React, { useState } from 'react'
import "./menuBar.scss";
import { Link, useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from "@mui/material/useMediaQuery";

export const MenuBar = () => {
  const locate = useLocation().pathname;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isClicked, setIsClicked] = useState(!isNonMobile);

    const menuList = [
    {
      listHead: "",
      listBody: [
        {
          title:'الرئيسيه' ,
          icon: <HomeOutlinedIcon className='icon'/>,
          to: '/'
        }]
    },
    {
      listHead: 'العمليات',
      listBody: [
        {
          title: 'كل العمليات',
          icon: <PeopleOutlinedIcon className='icon'/>,
          to: '/process'
        },
        {
          title: 'إضافه عمليه',
          icon: <ContactsOutlinedIcon className='icon' />,
          to: '/addprocess'
        }]
    },
    {
      listHead: 'التقارير',
      listBody: [
        {
          title: 'كل التقارير',
          icon: <PeopleOutlinedIcon className='icon'/>,
          to: '/analyics'
        },
        {
          title: 'إضافه تقرير',
          icon: <ContactsOutlinedIcon className='icon' />,
          to: '/addanalyics'
        }]
    },
    {
      listHead: 'المستخدمين',
      listBody: [
        {
          title: 'كل المستخدمين',
          icon: <PeopleOutlinedIcon className='icon'/>,
          to: '/users'
        },
      {
          title: 'اضافه مستخدم',
          icon: <PeopleOutlinedIcon className='icon'/>,
          to: '/adduser'
        },]
    },
    {
      listHead: 'المخازن',
      listBody: [
        {
          title: 'المخزن الرئيسي',
          icon: <PeopleOutlinedIcon className='icon'/>,
          to: '/store'
        },{
          title: 'المخزن الفرعي',
          icon: <PeopleOutlinedIcon className='icon'/>,
          to: '/secStore'
        },{
          title: 'المنصرف',
          icon: <PeopleOutlinedIcon className='icon'/>,
          to: '/outStore'      
        },{
          title: 'اضافه عنصر',
          icon: <PeopleOutlinedIcon className='icon'/>,
          to: '/addstore'
        },]
      }
      , {
      listHead: 'الخزنه',
      listBody: [
        {
          title: 'الخزنه',
          icon: <PeopleOutlinedIcon className='icon'/>,
          to: '/save'
        }]
      }        
      , {
      listHead: 'المرتبات',
      listBody: [
        {
          title: 'المرتبات',
          icon: <PeopleOutlinedIcon className='icon'/>,
          to: '/sallery'
        },
        {
          title: 'صرف مرتب',
          icon: <ContactsOutlinedIcon className='icon' />,
          to: '/sallery'
        },]
    },{
      listHead: 'الممولين',
      listBody: [
        {
          title: 'الممولين',
          icon: <PeopleOutlinedIcon className='icon'/>,
          to: '/funders'
        },
        {
          title: 'إضافه ممول',
          icon: <ContactsOutlinedIcon className='icon' />,
          to: '/addFunderCompany'
        }]
    },
    ];
  return (
    <div className={isClicked ?'w-zero':"menuBar"}> 
     {!isNonMobile &&( <div className='menuOppener'>      
       {isClicked === false ? ( <CloseIcon  style={{
              margin: " 0px",
          color: "inherit",       
        }}
          className={isNonMobile ===true ?'none':"closeIcon"}
          onClick={()=>setIsClicked(!isClicked)}
        />):(
        <MenuOutlinedIcon  style={{
              color: "inherit",              
        }}
          className={isNonMobile ===true ? 'none':"menuIcon"}
          onClick={()=>setIsClicked(!isClicked)}
        />
        )}
        </div> )}
          <div className='menuBarWrapper'>
              <div className="imgLogo">
                  <img src="./images/companylogo.png" alt='logo'/>
              </div>
              <hr/>
              <div className="menuItems">
                  {menuList.map((item, index) => (
                      <div className="menuItemWrapper" key={index}>
                      <div className="menuItemHeader">
                          {item.listHead}
                              </div>
                              {
                                  item.listBody.map((ele) => (
                                      <Link to={ele.to} style={{textDecoration:"none"}}>
                      <div className={ locate === ele.to ? `menuItemContent active`:"menuItemContent"}>
                          <div className="menuContentContainer">
                          {ele.icon}                            
                          <h6>{ele.title}</h6>
                          </div>
                      </div>                                      
                              </Link>
                                  ))
                            }
                          <hr/>
                          </div>
                      ))}                  
              </div>
          </div>
    </div>
  )
}
