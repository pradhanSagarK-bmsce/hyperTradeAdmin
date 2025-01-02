import { FaHouse , FaUsers , FaRegClock } from "react-icons/fa6";
import React from "react";
export const sidebaritems = [
    {
        title : 'Home',
        path : '/hyperTradeAdmin/home',
        icon : <FaHouse />,
        element : '<Home/>',
        cname : 'nav-item'
    },
    {
        title : 'OrderHistory',
        path : '/hyperTradeAdmin/orderhistory',
        icon : <FaRegClock />,
        element : '<OrderHistory />',
        cname : 'nav-item'
    },
    {
        title : 'Vendors',
        path : '/hyperTradeAdmin/vendors',
        icon : <FaUsers />,
        element : '<Vendors />',
        cname : 'nav-item'
    },

]