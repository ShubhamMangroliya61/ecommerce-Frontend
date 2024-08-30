import Navbar from "../features/navbar/Navbar";
import ProductList from '../features/product/product'

function Home() {
  return (
    <>
    <Navbar>
        <ProductList></ProductList>
    </Navbar>
    </>
  )
}

export default Home