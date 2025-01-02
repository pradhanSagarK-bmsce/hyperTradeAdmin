import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./components/pages/home/Home";
import OrderHistory from "./components/pages/orderhistory/OrderHistory";
import Vendors from "./components/pages/vendors/Vendors";
import LoginPage from "./components/Login-signup/LoginPage";
import Layout from "./components/layouts/Layout";
import RefreshHandler from "./components/utils/RefreshHandler";
import ProfilePage from "./components/pages/profilepage/ProfilePage";
import ErrorPage404 from "./components/pages/errorPage/ErrorPage404";


const App = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // undo after test

  const PrivateRoute = ({ element }) => {
    // if(localStorage.getItem('token')) setIsLoggedIn(true);
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <Router>
        <RefreshHandler setIsLoggedIn={setIsLoggedIn} />{" "}
        {/*uncomment after test */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route
            path="/login"
            element={<LoginPage />} //setVendorInfo={setVendorInfo}
          />
       
          <Route path="*" element={<ErrorPage404 />} />
          <Route
            path="/hyperTradeAdmin"
            element={<PrivateRoute element={<Layout />} />}
          >
            {/* <Route path="/hyperTradeAdmin" element={<Layout />}> */}
            <Route index element={<Home />} />
            <Route path="/hyperTradeAdmin/home" element={<Home />} />

            <Route
              path="/hyperTradeAdmin/profilepage"
              element={<ProfilePage />}
            />

            <Route
              path="/hyperTradeAdmin/orderhistory"
              element={<OrderHistory />}
            />
            <Route path="/hyperTradeAdmin/vendors" element={<Vendors />} />
            {/* <Route path="/hyperTradeAdmin/marketplace" element={<MarketPlace />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
