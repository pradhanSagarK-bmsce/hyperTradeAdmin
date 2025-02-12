import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorsData } from "../../../redux/features/VendorsData";
import VendorList from "./VendorList";


const Vendors = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  


    useEffect(() => {
      dispatch(fetchVendorsData()); 
    }, []);



  return (
    <div className="w-full h-full flex flex-col gap-3">
      <h1 className="pageHeader pl-2">Vendors</h1>
      <div className="w-full h-[95%]  mb-2 ">
      <VendorList />
      </div>
    </div>
  );
};

export default Vendors;
