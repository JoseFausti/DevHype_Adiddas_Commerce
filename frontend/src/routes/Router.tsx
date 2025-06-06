import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "../App"
import Login from "../components/screens/auth/Login"
import Register from "../components/screens/auth/Register"
import Shopcart from "../components/screens/shop/Shopcart"
import Products from "../components/screens/categories/Products"
import Logout from "../components/screens/auth/Logout"
import Admin from "../components/screens/admin/Admin"
import PurchaseProduct from "../components/screens/shop/PurchaseProduct"
import Layout from "../components/ui/Layout"

const Router = () => {
  return (
    <BrowserRouter> 
        <Routes>
            {/* Rutas con Layout */}
            <Route element={<Layout/>}>
              <Route path="/" element={<App/>} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="/products" element={<Products/>} />
              <Route path="/products/:id" element={<PurchaseProduct />} />
              <Route path="/shopcart" element={<Shopcart/>} />
            </Route>

            {/* Rutas sin Layout */}
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/logout" element={<Logout/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router
