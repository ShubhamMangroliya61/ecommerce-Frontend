import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminProductDetails from "../features/admin/components/AdminProductDetails";
import ProductForm from "../features/admin/components/ProductForm";

function AdminProductForm() {
  return (
    <Navbar>
      <ProductForm />
    </Navbar>
  );
}

export default AdminProductForm;
