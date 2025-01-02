import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import { Checkbox } from "../discounts/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaCircleInfo } from "react-icons/fa6";
import PDLoadingComponent from "../../Loaders/PDLoadingComponent";
import { updateDeliveryStatus } from "../../../redux/features/OrdersDataSlice";
import OrderDetailsModal from "./OrderDetailsModal";

function DeliveredOrders() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const colorMode = useSelector((state) => state.theme.color);
  const orders = useSelector((state) => state.ordersData.orders);
  const status = useSelector((state) => state.ordersData.status);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSaleIds, setSelectedSaleIds] = useState(null);
  const [sales, setSales] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    const orderSelected = selectedFlatRows.map((row) => ({
      orderId: row.original.orderId,
      LineId: row.original.LineId,
    }));
    setSelectedSaleIds(orderSelected[0])
    setIsOpen(true);
  };


   useEffect(() => {
      if (orders && Array.isArray(orders)) {
        // Combine all orderItems from each order into a single array
        const allOrderItems = orders.flatMap((order) => order.orderItems || []);
    
        // Filter items that match the conditions
        const relevantItems = allOrderItems.filter(
          (item) =>
            item.isDelivered === true &&
            item.deliveryStatusCode === 4 
        );
    
        // Update the state
        setDeliveredOrders(relevantItems);
      }
    }, [orders]);

  const columns = useMemo(
    () => [
      { Header: "Order ID", accessor: "orderId" },
      { Header: "Line ID", accessor: "LineId" },
      { Header: "Customer Name", accessor: "custName" },
      {
        Header: "Delivered At",
        accessor: "deliveryDateTime",
      },
      {
        Header: "Delivery Status",
        accessor: "deliveryStatus",
        Cell: ({ value }) => (
          <div className="p-2 max-w-[180px] flex justify-center items-center bg-[#a9ff8736] rounded-3xl">
            <p
              className={`${
                themeMode === "theme-mode-dark"
                  ? "text-[#16ff01]"
                  : "text-black"
              } font-semibold`}
            >
              {value}
            </p>
          </div>
        ),
      },
      {
        Header: "Order Status",
        accessor: "orderStatus",
        Cell: ({ value }) => (
          <div className="p-2 max-w-[120px] flex justify-center items-center bg-[#a9ff8736] rounded-3xl">
            <p
              className={`${
                themeMode === "theme-mode-dark"
                  ? "text-[#16ff01]"
                  : "text-black"
              } font-semibold`}
            >
              {value}
            </p>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter, selectedRowIds },
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: deliveredOrders,
    },
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const handleGlobalSearch = (e) => {
    setGlobalFilter(e.target.value || undefined);
  };

 

  return (
    <div
      className={`w-full h-full rounded-lg p-6 flex flex-col shadow-lg ${
        themeMode === "theme-mode-dark"
          ? "bg-black text-white"
          : "gradient-bg-light text-gray-800"
      }`}
    >
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 tracking-wide">Delivered Orders</h1>
      {deliveredOrders.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <p className="font-bold text-2xl">No Delivered orders</p>
        </div>
      ) : (
        <>
      
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            {/* Search Input */}
            <input
              type="text"
              value={globalFilter || ""}
              onChange={handleGlobalSearch}
              placeholder="Search orders..."
              className={`lg:w-[60%] sm:max-w-md px-4 py-2 rounded-md shadow focus:ring-2 focus:outline-none ${
                themeMode === "theme-mode-dark"
                  ? "bg-gray-800 text-gray-300 focus:ring-[#26DC5C]"
                  : "bg-gray-100 text-gray-700 focus:ring-[#26DC5C]"
              }`}
            />

            <button
              className={`flex items-center gap-2 rounded-lg font-semibold shadow-md px-4 py-2 transition-all mb-4 sm:mb-0 ${
                themeMode === "theme-mode-dark"
                  ? "bg-[#2c99ff] text-black hover:bg-[#5baffd]"
                  : "bg-[#2c99ff] text-white hover:bg-[#5baffd]"
              }`}
              onClick={onOpen}
            >
              <FaCircleInfo className="w-5 h-5" />
              <span>View Details</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="flex-grow flex flex-col">
            {status !== "succeeded" || !deliveredOrders ? (
              <div className="flex-grow flex justify-center items-center">
                <PDLoadingComponent />
              </div>
            ) : (
              <div
                className={`flex-grow rounded-lg p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "gradient-bg-dark"
                    : "bg-transparent"
                }`}
              >
                {/* Table */}
                <div className="overflow-x-auto flex-grow max-h-[50vh] sm:max-h-full">
                  <table {...getTableProps()} className="w-full text-left">
                    <thead>
                      {headerGroups.map((headerGroup, hgsindex) => (
                        <tr
                          {...headerGroup.getHeaderGroupProps()}
                          key={hgsindex}
                          className={`uppercase text-sm ${
                            themeMode === "theme-mode-dark"
                              ? "bg-gray-800 text-gray-400"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {headerGroup.headers.map((column, hindex) => (
                            <th
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                              key={hindex}
                              className={`py-3 px-4 font-semibold tracking-wide border-b hover:text-[#26DC5C] transition cursor-pointer ${
                                themeMode === "theme-mode-dark"
                                  ? "border-gray-700"
                                  : "border-gray-300"
                              }`}
                            >
                              {column.render("Header")}
                              <span>
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? " 🔽"
                                    : " 🔼"
                                  : ""}
                              </span>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody
                      {...getTableBodyProps()}
                      className={
                        themeMode === "theme-mode-dark"
                          ? "bg-black"
                          : "bg-white"
                      }
                    >
                      {rows.map((row) => {
                        prepareRow(row);
                        return (
                          <tr
                            {...row.getRowProps()}
                            key={row.id}
                            className={`hover:bg-[#26DC5C] hover:text-black transition-colors cursor-pointer`}
                          >
                            {row.cells.map((cell, cindex) => (
                              <td
                                {...cell.getCellProps()}
                                key={cindex}
                                className={`py-3 px-4 text-sm border-b ${
                                  themeMode === "theme-mode-dark"
                                    ? "border-gray-800"
                                    : "border-gray-300"
                                }`}
                              >
                                {cell.render("Cell")}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {isOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">
          <OrderDetailsModal
            isOpen={isOpen}
            onClose={onClose}
            currentOrders={deliveredOrders}
            selectedSaleIds={selectedSaleIds}
          />
        </div>
      )}
    </div>
  );
}

export default DeliveredOrders;
