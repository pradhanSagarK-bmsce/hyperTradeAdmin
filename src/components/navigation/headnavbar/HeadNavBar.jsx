import React, { useState } from "react";
import ThemeMenu from "../../Themes/ThemeMenu/ThemeMenu";
import {  useNavigate } from "react-router-dom";


const HeadNavBar = () => {

  const [adminName, setAdminName] = useState(
    localStorage.getItem("adminName")
  );
  const [adminImg, setAdminImg] = useState(
    localStorage.getItem("adminImg")
  );
  const currentUser =  {
        displayName: adminName || "Nexios Admin 1",
        image: adminImg
      };

  const navigate = useNavigate();
  const handleProfilePage = () => {
    navigate("/hyperTradeAdmin/profilepage");
  };

  

  return (
    <div className="topNav p-[30px] pl-[24px] flex items-center justify-between h-[65px] shadow-box-shadow z-10">
      <div className="topnavSearch relative flex items-center bg-main-bg rounded-md h-[40px]  overflow-hidden shadow-box-shadow">
        {/* <input
          type="text"
          placeholder="Search here ...."
          className="w-full h-full text-[1rem] text-txt-color pt-2 pr-16 pb-2 pl-5 rounded-lg bg-main-bg border-0 focus:border-0"
        />
        <button className="searc">
          <FaMagnifyingGlass className="text-zinc-500 text-[1.25rem]" />
        </button> */}

        <h1 className="text-3xl font-extrabold">Admin Panel </h1>

      </div>
      <div className="topnavRight flex items-center">
        <div className="topnavRight flex items-center">
        <div className="topnavRightItems profile flex justify-between items-center cursor-pointer" onClick={handleProfilePage}>
        <div className="w-12 h-12 border-[2px] rounded-full shadow-md hover:shadow-lg transition-all duration-300">
          <img src={currentUser.image} alt="user image" className="w-full h-full rounded-full object-cover" />
        </div>
        <p className="ml-4 text-lg font-semibold">{currentUser.displayName}</p>
      </div>
        </div>

        <div className="topnavRightItems ml-[30px] themeSettings">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default HeadNavBar;
