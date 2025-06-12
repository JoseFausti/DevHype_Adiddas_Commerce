import { Link } from "react-router-dom"
import { useAppSelector } from "../../../hooks/redux"
import ProductSummary from "../../ui/cart/ProductSummary"
import { ArrowRight } from "lucide-react"
import Styles from './Shopcart.module.css'
import CartItem from "../../ui/cart/CartItem"

const Shopcart = () => {

  const {cart} = useAppSelector((state) => state.cart) 

  return (
    <>
      <div>
        {cart.length === 0 
          ? 
            <div>
              {/* Carrito vacio */}
              <div className={Styles.emptyCart}>
                <h2 className={Styles.emptyCart__title}>El carrito esta vacio</h2>
                <p className={Styles.emptyCart__text}>Una vez que agregues un producto a tu carrito aparecera aca. Listo para empezar?</p>
                <button className={Styles.emptyCart__button}><Link to={'/products'} className={Styles.button_start}>Empezar <ArrowRight/></Link></button>
              </div>
              {/* Fin Carrito vacio */}
            </div>
          :
            <div className={Styles.cartContainer}>
              {/* Main Carrito con productos */}
              <div className={Styles.cartContainer__main}>
                <h2 className={Styles.cartTitle}>TU CARRITO</h2> {/* Vista del carrito con productos */ }
                {cart.map((product) => {
                    return (
                    <CartItem key={product.variant.id} item={product} />
                  )
                })}
              </div>
              {/* Fin Main Carrito con productos */}

              {/* Aside Carrito */}
              <div className={Styles.cartContainer__aside}>
                  <ProductSummary />
              </div>
              {/* Fin Aside Carrito */}  
            </div>
        }
      </div>
    </>
  )
}

export default Shopcart
