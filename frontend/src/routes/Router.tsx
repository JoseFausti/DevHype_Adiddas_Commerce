import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "../App"
import Login from "../components/screens/auth/Login"
import Register from "../components/screens/auth/Register"
import Shopcart from "../components/screens/shop/Shopcart"
import Products from "../components/screens/categories/Products"
import Logout from "../components/screens/auth/Logout"
import PurchaseProduct from "../components/screens/shop/PurchaseProduct"
import Layout from "../components/ui/Layout"
import AdminLayout from "../components/screens/admin/AdminLayout"
import Dashboard from "../components/screens/admin/Dashboard/Dashboard"
import { Users } from "../components/screens/admin/Users/Users"
import { AdminProducts } from "../components/screens/admin/Products/Products"
import RequireAdmin from "../components/screens/admin/auth/RequireAdmin"

const Router = () => {
  return (
    <BrowserRouter> 
        <Routes>
            {/* Rutas con Layout */}
            <Route element={<Layout/>}>
              <Route path="/" element={<App/>} />
              <Route path="/products" element={<Products/>} />
              <Route path="/products/:id" element={<PurchaseProduct />} />
              <Route path="/shopcart" element={<Shopcart/>} />

              {/* Rutas de Admin */}
              <Route 
                  path="/admin" 
                  element={
                    <RequireAdmin>
                      <AdminLayout />
                    </RequireAdmin>
                  }>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users/>} />
                <Route path="products" element={<AdminProducts />} />
              </Route> 
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
