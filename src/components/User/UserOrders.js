import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fecthLoggedInUserOrdersAsync,
  selectOrders,
} from "../../Redux/slice/userSlice";
import { selectLoggedInUser } from "../../Redux/slice/authSlice";

export default function UserOrder() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    if (user?.id) {
      dispatch(fecthLoggedInUserOrdersAsync(user.id));
    }
  }, [dispatch, user?.id]); // Add dependencies to the dependency array

  return (
    <div>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id}>
            <div className="mx-auto max-w-7xl px-4 sm:px-2 lg:px-2 bg-white mt-2 border-2 border-gray-200 rounded-md">
              <div className="px-4 py-2 sm:px-6">
                <h1 className="text-3xl my-2 font-bold tracking-tight text-gray-900">
                  Order #{order.id}
                </h1>
                <h1 className="text-xl my-2 font-bold tracking-tight text-red-900">
                  Order Status :{order.status}
                </h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.items.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            alt={product.title}
                            src={product.thumbnail}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.title}</a>
                              </h3>
                              <p className="ml-4">{product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="qty"
                                className="inline text-sm font-medium leading-6 text-gray-900 mr-5"
                              >
                                Qty :{product.quantity}
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${order.totalAmount}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Item In Cart</p>
                  <p>{order.totalItems} Items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping Address:
                </p>
                <div className="flex justify-between gap-x-6 px-5 py-5  border-2 rounded-md">
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddress.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddress.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddress.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {order.selectedAddress.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {order.selectedAddress.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
