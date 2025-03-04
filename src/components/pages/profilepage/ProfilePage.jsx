import React,{useState} from "react";
import { FaPhone, FaCertificate,  FaEarthAsia, FaLocationDot } from 'react-icons/fa6';
import bannerImg from "../../../assets/welcomebannerImg.png"
import { useSelector } from "react-redux";

const ProfilePage = () => {
 
    const themeMode = useSelector((state) => state.theme.mode);

    const [adminName,setAdminName] = useState(localStorage.getItem("adminName"))
      const  [adminImg,setAdminImg] = useState(localStorage.getItem('adminImg'))
      const currentUser =  {
        banner : bannerImg,
        displayName : adminName,
        image:  adminImg,
        phone : "9999999999",
        licencenum : "MRS-2024-3400",
        address : "Mars base 1 , colony 2 , Sector Alpha",
        pincode : "MRS111",
      } 
    
   

  return (
    <div className={`w-full h-full rounded-lg shadow-lg ${themeMode === "theme-mode-dark" ? "gradient-bg-dark text-txt-white" : "gradient-bg-light text-txt-color"}`}>
    <div className="max-w-8xl mx-auto">
      {/* Banner */}
      <div className="relative">
        <div className="h-[250px] rounded-t-lg overflow-hidden">
          <img 
            src={currentUser.banner}
            alt="Banner" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* <button className="absolute top-4 right-4 bg-[#26DC5C] shadow-lg p-3 rounded-full" onClick={handleEditProfile}>
          <FaPenToSquare className={`${themeMode === 'theme-mode-dark' ? "text-black" : "text-txt-white"}`} />
        </button> */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
            <img 
              src={currentUser.image}
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="mt-20 px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold ">{currentUser.displayName}</h1>
          <p className="text-gray-500 mt-2">Leading the Way in Our Field and Products</p>
        </div>
        <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-2 gap-6">
          <div className={`${themeMode === "theme-mode-dark" ? "bg-[#1F2937]" : "bg-white"} rounded-lg shadow-xl p-6`}>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <FaPhone className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className=" font-medium">{currentUser.phone}</p>
              </div>
            </div>
          </div>

          <div className={`${themeMode === "theme-mode-dark" ? "bg-[#1F2937]" : "bg-white"} rounded-lg shadow-xl p-6`}>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <FaCertificate className="text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">License Number</p>
                <p className=" font-medium">{currentUser.licencenum}</p>
              </div>
            </div>
          </div>

          <div className={`${themeMode === "theme-mode-dark" ? "bg-[#1F2937]" : "bg-white"} rounded-lg shadow-xl p-6`}>
            <div className="flex items-center space-x-4">
              <div className="min-w-10 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                < FaEarthAsia className="text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className=" font-medium">{currentUser.address}</p>
              </div>
            </div>
          </div>

          <div className={`${themeMode === "theme-mode-dark" ? "bg-[#1F2937]" : "bg-white"} rounded-lg shadow-xl p-6`}>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <FaLocationDot className="text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pincode</p>
                <p className=" font-medium">{currentUser.pincode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  );
};

export default ProfilePage;
