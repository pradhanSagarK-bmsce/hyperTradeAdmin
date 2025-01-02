import React, { useState, useEffect } from "react";
import { FaCartShopping, FaUsers, FaWarehouse, FaStore } from "react-icons/fa6";
import { useSelector } from "react-redux";

const AnalyticsCard = () => {
  const vendors = useSelector((state) => state.vendorsData.vendors);

  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [totalProductsForCommerce, setTotalProductsForCommerce] = useState(0);

  useEffect(() => {
    // Calculate the total number of customers, total vendors, total products sold, and total products for commerce
    if (vendors && vendors.length > 0) {
      let customers = 0;
      let vendorsCount = 0;
      let productsSold = 0;
      let productsForCommerce = 0;

      vendors.forEach(vendor => {
        // Count unique customers
        customers += vendor.totalCustomers;
        vendorsCount += 1;

        // Count products sold and available for commerce
        productsSold += vendor.noOfOrders;
        productsForCommerce += vendor.totalProducts;
      });

      setTotalCustomers(customers);
      setTotalVendors(vendorsCount);
      setTotalProductsSold(productsSold);
      setTotalProductsForCommerce(productsForCommerce);
    }
  }, [vendors]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-400 rounded-lg p-4 sm:p-5 md:p-6 shadow-2xl transform transition-all duration-500 grid grid-cols-2 gap-4 overflow-hidden">
      {/* Total Customers Section */}
      <div className="flex flex-col items-start space-y-1 w-full">
        <div className="flex items-center space-x-2">
          <FaUsers className="text-white text-2xl" />
          <span className="text-white text-xs sm:text-sm font-medium">Total Customers</span>
        </div>
        <div className="text-white text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
          {totalCustomers.toLocaleString("en-IN")}
        </div>
      </div>

      {/* Total Vendors Section */}
      <div className="flex flex-col items-start space-y-1 w-full">
        <div className="flex items-center space-x-2">
          <FaStore className="text-white text-2xl" />
          <span className="text-white text-xs sm:text-sm font-medium">Total Vendors</span>
        </div>
        <div className="text-white text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
          {totalVendors.toLocaleString("en-IN")}
        </div>
      </div>

      {/* Total Products Sold Section */}
      <div className="flex flex-col items-start space-y-1 w-full">
        <div className="flex items-center space-x-2">
          <FaCartShopping className="text-white text-2xl" />
          <span className="text-white text-xs sm:text-sm font-medium">Total Products Sold</span>
        </div>
        <div className="text-white text-xl sm:text-2xl font-bold">
          {totalProductsSold.toLocaleString("en-IN")}
        </div>
      </div>

      {/* Total Products for Commerce Section */}
      <div className="flex flex-col items-start space-y-1 w-full">
        <div className="flex items-center space-x-2">
          <FaWarehouse className="text-white text-2xl" />
          <span className="text-white text-xs sm:text-sm font-medium">Total Products for Commerce</span>
        </div>
        <div className="text-white text-xl sm:text-2xl font-bold">
          {totalProductsForCommerce.toLocaleString("en-IN")}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
