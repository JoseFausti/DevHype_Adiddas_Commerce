import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks/redux"
import ProductSummary from "../ui/cart/ProductSummary"
import { ArrowRight } from "lucide-react"
import Styles from './Shopcart.module.css'
import ProductShopcartCard from "../ui/cart/ProductShopcartCard"

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
            <div>
              {/* Main Carrito con productos */}
              <div>
                <h2>Tu carrito</h2>
                {cart.map((product) => {
                    return (
                    <ProductShopcartCard key={product.id} product={product} />
                  )
                })}
              </div>
              {/* Fin Main Carrito con productos */}

              {/* Aside Carrito */}
              <div>
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
