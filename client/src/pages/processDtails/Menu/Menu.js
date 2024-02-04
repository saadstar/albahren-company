import React from 'react'
import { Link, useParams } from "react-router-dom";
import ScienceIcon from "@mui/icons-material/Science";
import RoofingIcon from "@mui/icons-material/Roofing";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountTreeIcon from "@mui/icons-material/AccountTree";


export const Menu = () => {
  const { id } = useParams();
  return (
    <div className="menu">
      <Link
        to={`/processDetails/tubes/${id}`}
        style={{ textDecoration: "none" }}
        className="wTen"
      >
        <div className="item listItem">
          <div className="itemTitle">مواسير</div>
          <ScienceIcon id="none" />
        </div>
      </Link>
      <Link
        className="wTen"
        to={`/processDetails/sand/${id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="item listItem">
          <div className="itemTitle">رمل</div>
          <i class="fa-solid fa-umbrella-beach" id="none"></i>
        </div>
      </Link>
      <Link
        to={`/processDetails/sen/${id}`}
        style={{ textDecoration: "none" }}
        className="wTen"
      >
        <div className="item listItem">
          <div className="itemTitle">سن</div>
          <i class="fa-solid fa-trowel-bricks" id="none"></i>
        </div>
      </Link>
      <Link
        to={`/processDetails/cement/${id}`}
        style={{ textDecoration: "none" }}
        className="wTen"
      >
        <div className="item listItem">
          <div className="itemTitle">اسمنت</div>
          <RoofingIcon id="none" />
        </div>
      </Link>
      <Link
        to={`/processDetails/details/${id}`}
        style={{ textDecoration: "none" }}
        className="wTen"
      >
        <div className="item listItem">
          <div className="itemTitle">نثريات</div>
          <i class="fa-solid fa-layer-group" id="none"></i>
        </div>
      </Link>
      <Link
        to={`/processDetails/worker/${id}`}
        style={{ textDecoration: "none" }}
        className="wTen"
      >
        <div className="item listItem">
          <div className="itemTitle">مصناعيه</div>
          <i class="fa-solid fa-user-nurse" id="none"></i>
        </div>
      </Link>
      <Link
        to={`/processDetails/materials/${id}`}
        style={{ textDecoration: "none" }}
        className="wTen"
      >
        <div className="item listItem">
          <div className="itemTitle">خامات</div>
          <i class="fa-solid fa-screwdriver-wrench" id="none"></i>
        </div>
      </Link>
      <Link
        to={`/processDetails/azl/${id}`}
        style={{ textDecoration: "none" }}
        className="wTen"
      >
        <div className="item listItem">
          <div className="itemTitle">عزل</div>
          <i class="fa-solid fa-caret-up" id="none"></i>
        </div>
      </Link>
      <Link
        to={`/processDetails/transport/${id}`}
        style={{ textDecoration: "none" }}
        className="wTen"
      >
        <div className="item listItem">
          <div className="itemTitle">انتقالات مواقع</div>
          <i class="fa-solid fa-van-shuttle" id="none"></i>
        </div>
      </Link>
      <Link
        to={`/processDetails/repair/${id}`}
        style={{ textDecoration: "none" }}
        className="wTen"
      >
        <div className="item listItem">
          <div className="itemTitle">اعطال</div>
          <i class="fa-solid fa-hammer" id="none"></i>
        </div>
      </Link>
      <Link
        to={`/processDetails/wood/${id}`}
        style={{ textDecoration: "none" }}
        className="wTen"
      >
        <div className="item listItem">
          <div className="itemTitle">خشب</div>
          <i class="fa-solid fa-tree" id="none"></i>
        </div>
      </Link>
      <Link
        to={`/processDetails/workerInsurance/${id}`}
        style={{ textDecoration: "none" }}
        className="wTen"
      >
        <div className="item listItem">
          <div className="itemTitle">التأمين </div>
          <AccountBalanceIcon id="none" />
        </div>
      </Link>
      <Link
        to={`/processDetails/finalInsurance/${id}`}
        style={{ textDecoration: "none" }}
        className="wTen"
      >
        <div className="item listItem">
          <div className="itemTitle">التأمين الابتدائي</div>
          <AccountBalanceWalletIcon id='none'/>
        </div>
      </Link>
      <Link
        to={`/processDetails/returnInsurance/${id}`}
        style={{ textDecoration: "none" }}
        className="wTen"
      >
        <div className="item listItem">
          <div className="itemTitle">التأمين الاستحقاقي </div>
          <AccountTreeIcon id='none'/>
        </div>
      </Link>
    </div>
  );
}
