import React from "react";
import bgImg from "../../assets/marsbg5.jpg"; 
import AdminLogin from './AdminLogin';
import ImageCarousel from './ImageCarousel'



const LoginPage = ()  => {
 

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }} 
    >
      <div className='w-[70%] h-[85%] px-4 py-2 bg-black bg-opacity-50 rounded-xl flex justify-between items-center'>
        <ImageCarousel />
        
        <AdminLogin  />

      </div>
    </div>
  );
}

export default LoginPage;
