import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./auth/authContext/authContext";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./component/Navbar";
import { MenuBar } from "./component/MenuBar";
import { Users } from "./pages/usersFeatures/Users";
import { ProcessDetails } from "./pages/processDtails/ProcessDetails";
import { ProcessHome } from "./pages/ProcessHome/ProcessHome";
import { Tubes } from "./pages/processDtails/products/tubes/Tubes";
import { Details } from "./pages/processDtails/products/details/Details";
import { Sand } from "./pages/processDtails/products/sand/Sand";
import { Wood } from "./pages/processDtails/products/Wood/Wood";
import { Rooms } from "./pages/processDtails/products/roomsDetails/Rooms";
import { Store } from "./pages/Store/Store";
import { AddStore } from "./pages/Store/AddStore";
import { Save } from "./pages/Save/Save";
import { Car } from "./pages/car/Car";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { Funders } from "./pages/Funders/Funders";
import { Sallery } from "./pages/Sallery/Sallery";
import { Analyics } from "./pages/Analyics/Analyics";
import { AnalyicsDetails } from "./pages/AnalyicsDetails/AnalyicsDetails";
import { AnalyicsReport } from "./pages/AnalyicsDetails/AnalyicsReport/AnalyicsReport";
import { Insurance } from "./pages/processDtails/products/Insurance/Insurance";
import { LoadingPage } from "./Loading/LoadingPage";
import Dashboard from "./component/DashBoard";
import { AddProcess } from "./pages/ProcessHome/AddProcess";
import { AddAnalyics } from "./pages/Analyics/AddAnalyics";
import { Renvue } from "./pages/processDtails/products/renvue/Renvue";
import { AddFunderCompany } from "./pages/Funders/AddFunderCompany";
import { FunderDetails } from "./pages/Funders/FunderDetails";

function App() {
  const [theme, colorMode] = useMode();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {user === null || undefined ? (
          <div>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </div>
        ) : (
          <div className="app">
            <MenuBar />
            <main className="content">
              <Navbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                  exact
                  path="/process"
                  element={loading === true ? <LoadingPage /> : <ProcessHome />}
                />
                <Route path="/addProcess" element={<AddProcess />} />
                <Route exact path="/loading" element={<LoadingPage />} />
                <Route path="/process/:id" element={<ProcessDetails />} />
                <Route
                  path="/processDetails/tubes/:id"
                  element={<Tubes type="tubes" ar="مواسير" />}
                />
                <Route
                  path="/processDetails/worker/:id"
                  element={<Tubes type="worker" ar="مصناعيه" />}
                />
                <Route
                  path="/processDetails/sand/:id"
                  element={<Sand type="sand" ar="الرمل" />}
                />
                <Route
                  path="/processDetails/sen/:id"
                  element={<Sand type="sen" ar="السن" />}
                />
                <Route
                  path="/processDetails/cement/:id"
                  element={<Sand type="cement" ar="الاسمنت" />}
                />
                <Route
                  path="/processDetails/details/:id"
                  element={<Details sort="details" ar="نثريات" />}
                />
                <Route
                  path="/processDetails/transport/:id"
                  element={<Details sort="transport" ar="انتقالات مواقع" />}
                />
                <Route
                  path="/processDetails/materials/:id"
                  element={<Details sort="materials" ar="خامات" />}
                />
                <Route
                  path="/processDetails/repair/:id"
                  element={<Details sort="repair" ar="اعطال" />}
                />
                <Route
                  path="/processDetails/azl/:id"
                  element={<Details sort="azl" ar="عزل" />}
                />
                <Route
                  path="/processDetails/wood/:id"
                  element={<Wood ar={"خشب"} type={"wood"} />}
                />
                <Route
                  path="/processDetails/rooms/:id"
                  element={<Rooms type="rooms" ar="غرف" />}
                />
                <Route
                  path="/processDetails/sallery/:id"
                  element={<Details sort="sallery" ar="المرتبات" />}
                />
                <Route
                  path="/processDetails/workerInsurance/:id"
                  element={
                    <Insurance type="workerInsurance" ar="التأمين و العماله" />
                  }
                />
                <Route
                  path="/processDetails/finalInsurance/:id"
                  element={
                    <Insurance type="finalInsurance" ar="التأمين الابتدائي" />
                  }
                />
                <Route
                  path="/processDetails/returnInsurance/:id"
                  element={
                    <Insurance
                      type="returnInsurance"
                      ar="التأمين الاستحقاقي النهائي"
                    />
                  }
                />
                <Route path="/processRenvue/:id" element={<Renvue />} />
                <Route path="/users" element={<Users />} />
                <Route path="/adduser" element={<Signup />} />
                <Route
                  path="/store"
                  element={<Store exist={1} ar="المخزن الرئيسي" />}
                />
                <Route
                  path="/secStore"
                  element={<Store exist={2} ar="المخزن الفرعي" />}
                />
                <Route
                  path="/outStore"
                  element={<Store exist={3} ar="المنصرف" />}
                />
                <Route path="/addstore" element={<AddStore />} />
                <Route path="/save" element={<Save />} />
                <Route path="/car" element={<Car />} />
                <Route path="/funders" element={<Funders />} />
                <Route
                  path="/addFunderCompany"
                  element={<AddFunderCompany />}
                />
                <Route path="/funders/:id" element={<FunderDetails />} />
                <Route path="/sallery" element={<Sallery />} />
                <Route path="/analyics" element={<Analyics />} />
                <Route path="/addAnalyics" element={<AddAnalyics />} />
                <Route path="/analyics/:id" element={<AnalyicsDetails />} />
                <Route
                  path="/analyics/report/:id"
                  element={<AnalyicsReport type="one" dataNum={2} />}
                />
                <Route
                  path="/analyics/finalreport/:id"
                  element={<AnalyicsReport type="two" dataNum={3} />}
                />
              </Routes>
            </main>
          </div>
        )}
        <ToastContainer />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
