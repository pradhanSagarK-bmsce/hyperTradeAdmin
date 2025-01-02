import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import bannerImg from "../../../assets/welcomebannerImg.png";
import martianWaving from "../../../assets/martianWaving.png";
import Chart2 from "./Chart2";
import FinancialCard from "../../Card/FinancialCard"; 
import TopCategoriesChart from "../../Card/TopVendors";
import LatestOrderHome from "./LastestOrderHome";
import AnalyticsCard from "../../Card/AnalyticsCard";
import { fetchAllOrders } from "../../../redux/features/OrdersDataSlice";
import { fetchVendorsData } from "../../../redux/features/VendorsData";


let adminName = "company Name";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.ordersData.orders);
  
  const themeMode = useSelector((state) => state.theme.mode);
  const [adminName, setAdminName] = useState(localStorage.getItem("adminName"));

  const handleExploreOrders = () => {
    navigate("/hyperTradeAdmin/orderhistory");
  };

  // Fetch orders immediately when the app loads (on first render)
  useEffect(() => {
    dispatch(fetchAllOrders()); // Dispatch fetchAllOrders action to get data on mount
  }, []);

  useEffect(() => {
    dispatch(fetchVendorsData()); // Dispatch fetchVendorData action to get data on mount
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <h1 className="pageHeader pl-2">Home</h1>

      <div className="w-full h-[95%] grid grid-cols-9 grid-rows-11 gap-3 ">
        <div className="col-span-4 row-span-3  rounded-lg">
          <div
            className="w-full h-full  rounded-lg"
            style={{
              backgroundImage: `url(${bannerImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full h-full rounded-lg banner-bg-gradient flex justify-between">
              <div className="h-full flex flex-col gap-2 w-full sm:w-[70%] p-4">
                <h2 className="lg:text-3xl font-semibold text-[#26DC5C]">
                  Welcome Back
                </h2>
                <span className="lg:text-2xl font-semibold text-txt-white">
                  {adminName || "company Name"}
                </span>
                <p className="lg:text-[0.85rem] w-full sm:w-[80%] font-semibold text-[#AFAFAF]">
                  Welcome back,We’re excited to have you with us again.
                  The site’s performance and growth are important. Check out the latest
                  analytics and orders,optimizing experience for users!
                </p>
                <button
                  className="lg:w-[140px] rounded-md bg-[#DA653A] p-1 text-black font-semibold mt-2"
                  onClick={handleExploreOrders}
                >
                  Explore Orders
                </button>
              </div>
              <div className="astroContainer h-full w-[30%] sm:w-[18%]">
                <img
                  src={martianWaving}
                  alt="Martian waving , greeting welcome back vendor"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 row-span-3">
          <FinancialCard />
        </div>
        <div className="col-span-2 row-span-3">
          <AnalyticsCard />
        </div>

        <div
          className={`col-span-7 row-span-3 rounded-lg ${
            themeMode === "theme-mode-dark" ? "bg-black" : "gradient-bg-light"
          }`}
        >
          {!orders ? (
            <div className="w-full h-full mb-8 flex justify-center items-center">
              <p
                className={`text-xl font-bold ${
                  themeMode === "theme-mode-dark"
                    ? "text-txt-white"
                    : "text-txt-color"
                }`}
              >
                No sales to track at the moment. Revenue and profit data will
                update once orders are received
              </p>
            </div>
          ) : (
            <Chart2 />
          )}
        </div>
        {/*"bg-gradient-to-br from-purple-900 via-rose-900 to-purple-900" was before color of below div */}
        <div
          className={`col-span-2 row-span-8 rounded-lg ${
            themeMode === "theme-mode-dark"
              ? "gradient-bg-dark"
              : "gradient-bg-light"
          }`}
        >
          <TopCategoriesChart />
        </div>

        <div className="col-span-7 row-span-5">
          <LatestOrderHome />
        </div>
      </div>
    </div>
  );
};

export default Home;
