import React from 'react';
import "./landingHome.css";
import StoreIcon from "@mui/icons-material/Store";
import AirplayIcon from "@mui/icons-material/Airplay";
import PaidIcon from "@mui/icons-material/Paid";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const LandingHome = () => {
    return (
      <div className="landingHome">
        <div className="landing-flex">
          <div className="">
            <h2 className="">تحكم بعالمك معنا ! </h2>
            <span>
              من خلالنا يمكنك ببساطه تحققيق ما كنت تعتقد انه مستحيل تنفيذه, نقدم
              لكم خبراء في كل المجالات الخاصه بفروعنا و هو ما يجعلنا فريدين في
              هذا المجال{" "}
            </span>
            <br />
            <button className="landingBtn">تواصل معنا</button>
          </div>
          <img alt="landingHome" src="./images/landingHome1.jpg" />
        </div>
        <div className="howwedo">
          <h3>ماذا نوفر؟ </h3>
          <div className="do-flex">
            <div className="card-column">
              <AirplayIcon className="myIcon" />
              <h4>العمليات</h4>
              <p>تحكم كامل بالعمليات الخاصه بكم .</p>
            </div>
            <div className="card-column">
              <StoreIcon className="myIcon" />
              <h4>المخازن</h4>
              <p>متابعه فوريه للتحركات داخل المخازن الخاصه بكم</p>
            </div>
            <div className="card-column">
              <AttachMoneyIcon className="myIcon" />
              <h4>الخزنه</h4>
              <p>متابعه فوريه للتحركات الماليه</p>
            </div>
            <div className="card-column">
              <PaidIcon className="myIcon" />
              <h4>التمويل</h4>
              <p>متابعه فوريه لشركات التمويل</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="landing-flex direction-row-reverse">
          <div className="">
            <h2 className="">انشأ عالمك المتميز من خلالنا.</h2>
            <span>
              من خلالنا يمكنك ببساطه تحققيق ما كنت تعتقد انه مستحيل تنفيذه, نقدم
              لكم خبراء في كل المجالات الخاصه بفروعنا و هو ما يجعلنا فريدين في
              هذا المجال{" "}
            </span>
            <br />
          </div>
          <img alt="landingHome" src="./images/landingHome2.jpg" />
        </div>
      </div>
    );
}
