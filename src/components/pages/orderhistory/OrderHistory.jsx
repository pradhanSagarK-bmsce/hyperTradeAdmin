import React,{useEffect} from 'react'
import { FaArrowRotateRight } from "react-icons/fa6";
import { useSelector,useDispatch } from 'react-redux'
import DispatchedOrders from './DispatchedOrders'
import OutForDelivery from './OutForDelivery'
import { fetchAllOrders } from '../../../redux/features/OrdersDataSlice';
import DeliveredOrders from './DeliveredOrders'

const OrderHistory = () => {
  const dispatch = useDispatch()
  const themeMode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  const handleRefresh = () => {
    dispatch(fetchAllOrders());
  };
 
  return (
    <div className="w-full h-full flex flex-col gap-3">
     <div className='pageHeader pl-2 flex items-center justify-between'>
     <h1>Order History</h1>
     
      <button className={`p-2 ${themeMode === "theme-mode-dark" ? "text-black" : "text-txt-white"} bg-[#26DC5C] rounded-lg shadow-lg flex items-center justify-around min-w-[200px]`} onClick={handleRefresh}>
        <FaArrowRotateRight />
        Refresh
      </button>
     
     </div>
      <div className='w-full grid grid-cols-10 grid-rows-10 gap-4'>
       
          <div className="col-span-5 row-span-1 rounded-lg"><DispatchedOrders /></div>
          <div className="col-span-5 row-span-1 rounded-lg"><OutForDelivery /></div>
          <div className='col-span-10 row-span-6 rounded-lg'><DeliveredOrders /></div>
      
      </div>
    </div>
  )
}

export default OrderHistory
