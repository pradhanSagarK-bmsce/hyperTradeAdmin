import { FaHouse  , FaChartPie , FaBox , FaTags , FaUsers ,  FaRegClock , FaGlobe} from "react-icons/fa6";

export const sidebaritems = [
    {
        title : 'Home',
        path : '/hyperTradeAdmin/home',
        icon : <FaHouse />,
        element : '<Home/>',
        cname : 'nav-item'
    },
    // {
    //     title : 'Dashboard',
    //     path : '/hyperTradeAdmin/dashboard',
    //     icon : <FaChartPie />,
    //     element : '<Dashboard />',
    //     cname : 'nav-item'
    // },
    // {
    //     title : 'Inventory',
    //     path : '/hyperTradeAdmin/inventory',
    //     icon : <FaBox />,
    //     element : '<Inventory />',
    //     cname : 'nav-item'
    // },
    // {
    //     title : 'Discounts',
    //     path : '/hyperTradeAdmin/discounts',
    //     icon : <FaTags />,
    //     element : '<Discounts />',
    //     cname : 'nav-item'
    // },
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
    // {
    //     title : 'MarketPlace',
    //     path : '/hyperTradeAdmin/marketplace',
    //     icon : <FaGlobe />,
    //     element : '<MarketPlace />',
    //     cname : 'nav-item'
    // },
]