import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./components/pages/home/Home";
// import Dashboard from "./components/pages/dashboard/Dashboard";
import Inventory from "./components/pages/inventory/Inventory";
import Discounts from "./components/pages/discounts/Discounts";
import OrderHistory from "./components/pages/orderhistory/OrderHistory";
import Customers from "./components/pages/customers/Customers";
// import MarketPlace from "./components/pages/marketplace/MarketPlace";
import LoginPage from "./components/Login-signup/LoginPage";
// import SignupPage from "./components/Login-signup/SignupPage";
// import VendorSignup from "./components/Login-signup/VendorSignup";
// import VendorLogin from "./components/Login-signup/AdminLogin";
import Layout from "./components/layouts/Layout";
import AddProduct from "./components/pages/inventory/AddProduct";
import UpdateProduct from "./components/pages/inventory/UpdateProduct";
import EditStock from "./components/pages/inventory/EditStock";
import DeleteProduct from "./components/pages/inventory/DeleteProduct";
import RefreshHandler from "./components/utils/RefreshHandler";
import ApplyDiscount from "./components/pages/discounts/ApplyDiscount";
// import useFetchOrdersPeriodically from "./customHooks/useFetchOrdersPeriodically"
import ProfilePage from "./components/pages/profilepage/ProfilePage"
// import EditProfile from "./components/pages/profilepage/EditProfile"; 
// import { fetchVendorInfo } from "./redux/features/VendorInfoSlice";
// import LandingPage from "./components/pages/landingpage/LandingPage";
import ErrorPage404 from "./components/pages/errorPage/ErrorPage404";
const App = () => {
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false); // undo after test
  // const [vendorInfo, setVendorInfo] = useState(null);

  const PrivateRoute = ({ element }) => {
    // if(localStorage.getItem('token')) setIsLoggedIn(true);
    return isLoggedIn ? element : <Navigate to="/login" />;
  };


  // useEffect(() => {
  //       dispatch(fetchVendorInfo());
  //     }, []);

  // useFetchOrdersPeriodically(90000);
  return (
    <>
      <Router>
        <RefreshHandler setIsLoggedIn={setIsLoggedIn} />{" "}
        {/*uncomment after test */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          {/* <Route
            path="/landingpage"
            element={<LandingPage />}
          /> */}
          <Route
            path="/login"
            element={<LoginPage />} //setVendorInfo={setVendorInfo} 
          />
          {/* <Route path="/signup" element={<SignupPage />} /> */}
          <Route path="*" element={<ErrorPage404 />} />
          <Route
            path="/hyperTradeAdmin"
            element={<PrivateRoute element={<Layout />} />}
          >
            {/* <Route path="/hyperTradeAdmin" element={<Layout />}> */}
            <Route index element={<Home />} />
            <Route path="/hyperTradeAdmin/home" element={<Home />} />
         
            <Route path="/hyperTradeAdmin/profilepage" element={<ProfilePage />} />
 

            {/* <Route path="/hyperTradeAdmin/inventory" element={<Inventory />}>
              <Route
                path="/hyperTradeAdmin/inventory/addproduct"
                element={<AddProduct />}
              />
              <Route
                path="/hyperTradeAdmin/inventory/updateproduct"
                element={<UpdateProduct />}
              />
              <Route
                path="/hyperTradeAdmin/inventory/editstock"
                element={<EditStock />}
              />
              <Route
                path="/hyperTradeAdmin/inventory/deleteproduct"
                element={<DeleteProduct />}
              />
            </Route>
            <Route path="/hyperTradeAdmin/discounts" element={<Discounts />}>
              <Route
                path="/hyperTradeAdmin/discounts/applydiscount"
               element={<ApplyDiscount />}
              />
            </Route> */}


            <Route path="/hyperTradeAdmin/orderhistory" element={<OrderHistory />} />
            <Route path="/hyperTradeAdmin/vendors" element={<Customers />} />
            {/* <Route path="/hyperTradeAdmin/marketplace" element={<MarketPlace />} /> */}
            
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
