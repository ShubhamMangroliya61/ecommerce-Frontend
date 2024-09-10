import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductDetailsPage from "./pages/Product/ProductDetailsPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemByUserIdAsync } from "./Redux/slice/cartSlice";
import { selectLoggedInUser, useSelectorAuthState, useSelectorUserState } from "./Redux/slice/authSlice";
import PageNotFound from "./pages/404";
import { fecthLoggedInUserAsync } from "./Redux/slice/userSlice";
import AdminProductDetailsPage from "./pages/Admin/AdminProductDetailsPage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import Home from "./pages/Home/Home";
import Logout from "./components/Auth/Logout";
import AdminHome from "./pages/Admin/AdminHome";
import AdminOrderPage from "./pages/Admin/AdminOrderPage";
import AdminProductForm from "./pages/Admin/AdminProductForm";
import Protected from "./components/Auth/Protected";
import ProtectedAdmin from "./components/Auth/ProtectedAdmin";
import CartPage from "./pages/Cart/CartPage";
import Checkout from "./pages/Cart/Checkout";
import UserProfilePage from "./pages/User/UserProfilePage";
import UserOrderPage from "./pages/Order/UserOrderPage";
import OrderSuccessPage from "./pages/Order/OrderSuccessPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/admin/product-details/:id",
    element: (
      <Protected>
        <ProductDetailsPage></ProductDetailsPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductForm></AdminProductForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrderPage></AdminOrderPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductForm></AdminProductForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/product-details/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailsPage></AdminProductDetailsPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrderPage></UserOrderPage>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const {loggedInUser} = useSelectorAuthState();
  useEffect(() => {
      dispatch(fetchItemByUserIdAsync());
      dispatch(fecthLoggedInUserAsync());
  }, [loggedInUser]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
