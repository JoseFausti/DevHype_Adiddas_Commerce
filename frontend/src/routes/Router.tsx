import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "../App"
import Login from "../components/screens/auth/Login"
import Register from "../components/screens/auth/Register"
import Shopcart from "../components/screens/shop/Shopcart"
import Products from "../components/screens/categories/Products"
import Logout from "../components/screens/auth/Logout"
import PurchaseProduct from "../components/screens/shop/PurchaseProduct"
import AdminLayout from "../components/screens/admin/AdminLayout"
import Dashboard from "../components/screens/admin/Dashboard/Dashboard"
import { Users } from "../components/screens/admin/Users/Users"
import RequireAdmin from "../components/screens/admin/auth/RequireAdmin"
import About from "../components/screens/about/About"
import Success from "../components/ui/mp/Success"
import Failure from "../components/ui/mp/Failure"
import Pending from "../components/ui/mp/Pending"
import Layout from "../components/ui/Layout"
import { AdminProducts } from "../components/screens/admin/Products/Products"
import Profile from "../components/screens/auth/Profile"
import MostInteresting from "../components/screens/most interesting/MostInteresting"

const Router = () => {
  return (
    <BrowserRouter> 
        <Routes>
            {/* Rutas con Layout */}
            <Route element={<Layout/>}>
              <Route path="/" element={<App/>} />
              <Route path="/products" element={<Products/>} />
              <Route path="/products/:id" element={<PurchaseProduct />} />
              <Route path="/profile" element={<Profile/>} /> 
              <Route path="/shopcart" element={<Shopcart/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/most-interesting" element={<MostInteresting />} />

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

            <Route path="/success" element={<Success/>} />
            <Route path="/failure" element={<Failure/>} />
            <Route path="/pending" element={<Pending/>} />
        </Routes> 
    </BrowserRouter>
  )
}

export default Router
