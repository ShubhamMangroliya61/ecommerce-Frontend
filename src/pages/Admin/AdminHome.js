import AdminProductList from "../../components/Admin/AdminProductList";
import Navbar from "../../components/Navbar/Navbar";

function AdminHome() {
  return (
    <>
      <Navbar>
        <AdminProductList />
      </Navbar>
    </>
  );
}

export default AdminHome;
