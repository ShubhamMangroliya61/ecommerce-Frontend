import React, { useEffect, useState } from "react";
import { PencilIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersAsync,
  selectOrder,
  selectTotalOrder,
  updateOrdersAsync,
} from "../../../Redux/slice/orderSlice";
import {

  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";

function AdminOrder() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const dispatch = useDispatch();
  const orders = useSelector(selectOrder) || [];
  const totalPage = useSelector(selectTotalOrder);
  const [editableOrderId, setEditableOrderId] = useState(-1);

  useEffect(() => {
    const pagination = { _page: page, _PER_PAGE: 10 };
    dispatch(fetchOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  const handlePage = (page) => {
    setPage(page);
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrdersAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handleOrderPaymentStatus = (e, order) => {
    const updatedOrder = { ...order, paymentStatus: e.target.value };
    dispatch(updateOrdersAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handleEdit = (order) => {
    if (editableOrderId === -1) setEditableOrderId(order.id);
    else {
      setEditableOrderId(-1);
    }
  };
  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };
  const handleShow = () => {
    console.log("handleShow");
  };
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };
  return (
    <>
      <div className="overflow-x-auto">
        <div className="bg-white flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-1 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order#{" "}
                      {sort._sort === "id" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                    </th>
                    <th className="py-3 px-5 text-left">Items</th>
                    <th
                      className="py-3 px-0 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Total Amount{" "}
                      {sort._sort === "totalAmount" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                    </th>
                    <th className="py-3 px-1 text-center">Shipping Address</th>
                    <th className="py-3 px-1 text-center">Order Status</th>
                    <th className="py-3 px-1 text-center">Payment Method</th>
                    <th className="py-3 px-1 text-center">Payment Status</th>
                    <th
                      className="py-3 px-1 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "createdAt",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order Time{" "}
                      {sort._sort === "createdAt" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                    </th>
                    <th
                      className="py-3 px-1 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "updatedAt",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Last Updated{" "}
                      {sort._sort === "updatedAt" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                    </th>
                    <th className="py-3 px-1 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-0 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-0 text-left">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.thumbnail}
                                alt={item.title}
                              />
                            </div>
                            <span>
                              {item.title} - #{item.quantity} - $
                              {item.discountPercentage}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="flex items-center justify-center">
                          ${order.totalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div>
                          <div>
                            <strong>{order.selectedAddress.name}</strong>,
                          </div>
                          <div>{order.selectedAddress.street},</div>
                          <div>{order.selectedAddress.city},</div>
                          <div>{order.selectedAddress.state},</div>
                          <div>{order.selectedAddress.pinCode},</div>
                          <div>{order.selectedAddress.phone}</div>
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        {order.id === editableOrderId ? (
                          <select
                            onChange={(e) => handleOrderStatus(e, order)}
                            className="rounded-md"
                          >
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-md`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="flex items-center justify-center">
                          {order.paymentMethod}
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        {order.id === editableOrderId ? (
                          <select
                            className="rounded-md"
                            onChange={(e) => handleOrderPaymentStatus(e, order)}
                          >
                            <option value="">--Choose one--</option>
                            <option value="pending">Pending</option>
                            <option value="received">Received</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.paymentStatus
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.paymentStatus}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-1 text-center">
                        <div className="flex items-center justify-center">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleString()
                            : null}
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          {order.updatedAt
                            ? new Date(order.updatedAt).toLocaleString()
                            : null}
                        </div>
                      </td>
                      <td className="py-3 px-1 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon
                              className="w-6 h-6"
                              onClick={(e) => handleShow(order)}
                            />
                          </div>
                          <div className="w-6 transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon
                              className="w-6 h-6"
                              onClick={(e) => handleEdit(order)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          totalItems={totalPage}
          handlePage={handlePage}
        />
      </div>
    </>
  );
}

export default AdminOrder;
