import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectedCart,
  updateCartAsync,
} from "../../Redux/slice/cartSlice";
import { useForm } from "react-hook-form";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../../Redux/slice/orderSlice";
import { selectUserInfo, updateUserAsync } from "../../Redux/slice/userSlice";

function Checkout() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const items = useSelector(selectedCart);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const orderPlaced = useSelector(selectCurrentOrder);
  const isOrderDisbale= !selectedAddress;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const user = useSelector(selectUserInfo);
  
  const totalAmount = items.reduce(
    (amount, item) => item.product.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const handleQty = async (e, item) => {
    await dispatch(updateCartAsync({ ...item, quantity: e.target.value }));
  };

  const handleRemove = async (e, id) => {
    await dispatch(deleteItemFromCartAsync(id));
  };

  const onSubmit = async (data) => {
    await dispatch(
      updateUserAsync({ ...user, addresses: [...user.addresses, data] })
    );
    reset();
  };

  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };
  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleOrder = async (e) => {
    const order = {
      items,
      totalAmount,
      totalItems,
      user : user.id,
      paymentMethod,
      selectedAddress,
      status: "pending",
    };
    await dispatch(createOrderAsync(order));
  };
  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {orderPlaced && (
        <Navigate
          to={`/order-success/${orderPlaced.id}`}
          replace={true}
        ></Navigate>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="py-3 mt-12">
              <form onSubmit={handleSubmit(onSubmit)} noValidate method="POST">
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-3xl font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            id="first-name"
                            {...register("name", {
                              required: "name is required",
                            })}
                            type="text"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email is required",
                            })}
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label
                          htmlFor="PHONE"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          phone
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            {...register("phone", {
                              required: "phone is required",
                            })}
                            type="number"
                            autoComplete="phone"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            id="street-address"
                            {...register("street", {
                              required: "street is required",
                            })}
                            type="text"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            id="city"
                            {...register("city", {
                              required: "city is required",
                            })}
                            type="text"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            id="region"
                            {...register("state", {
                              required: "state is required",
                            })}
                            type="text"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            id="postal-code"
                            {...register("pinCode", {
                              required: "pinCode is required",
                            })}
                            type="text"
                            autoComplete="postal-code"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save Address
                    </button>
                  </div>
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Address
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from Existing Address
                    </p>
                    <ul>
                      {user.addresses.map((address, index) => (
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 px-5 py-5 shadow-lg"
                        >
                          <div className="flex gap-x-4">
                            <input
                              onChange={handleAddress}
                              name="address"
                              type="radio"
                              value={index}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {address.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {address.street}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {address.pinCode}
                              </p>
                            </div>
                          </div>
                          <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              Phone: {address.phone}
                            </p>
                            <p className="text-sm leading-6 text-gray-500">
                              {address.city}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Payment Method
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Choose One
                        </p>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              onChange={handlePayment}
                              id="cash"
                              value="cash"
                              name="payments"
                              type="radio"
                              checked={paymentMethod === "cash"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="cash"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              onChange={handlePayment}
                              id="card"
                              value="card"
                              name="payments"
                              type="radio"
                              checked={paymentMethod === "card"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="card"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Card
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto max-w-7xl px-2 sm:px-3 lg:px-2 bg-white mt-5">
              <div className="px-4 py-6 sm:px-6">
                <h1 className="text-4xl my-6 font-bold tracking-tight text-gray-900">
                  Cart
                </h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            alt={product.title}
                            src={product.product.thumbnail}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.product.title}</a>
                              </h3>
                              <p className="ml-4">{product.product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="qty"
                                className="inline text-sm font-medium leading-6 text-gray-900 mr-5"
                              >
                                Qty
                              </label>
                              <select
                                onChange={(e) => handleQty(e, product)}
                                value={product.quantity}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                onClick={(e) => handleRemove(e, product.id)}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
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
                  <p>${totalAmount}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Item In Cart</p>
                  <p>{totalItems} Items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                     onClick={!isOrderDisbale ? handleOrder : undefined}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Order Now
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
