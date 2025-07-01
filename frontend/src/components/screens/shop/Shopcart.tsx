import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import ProductSummary from "../../ui/cart/ProductSummary"
import { ArrowRight } from "lucide-react"
import Styles from './Shopcart.module.css'
import CartItem from "../../ui/cart/CartItem"
import { getDecodedToken } from "../../../utils/functions"
import { useEffect, useState } from "react"
import { X } from "lucide-react";
import { getUserByUsername } from "../../../data/UsersController"
import { DirectionForm } from "../../ui/cart/DirectionForm"
import { PaymentMethod, Status } from "../../../utils/enums"
import { addUser, setUserActive } from "../../../store/slices/userSlice"
import { createPurchaseOrder } from "../../../data/PurchaseOrdersController"

const Shopcart = () => {

  const token = getDecodedToken();
  const { cart } = useAppSelector((state) => state.cart)

  const { userActive, users } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [, setInitPoint] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserByUsername(token!.sub);
        if (response.status === 200) {
          const user = response.data;
          if (user) {
            dispatch(setUserActive(user));
            dispatch(addUser(user));
          } else { throw new Error() };
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    }
    fetchUser();
  }, [])

  const createOrder = async () => {
    try {
      const response = await createPurchaseOrder({
        userId: userActive!.id,
        paymentMethod: PaymentMethod.MERCADO_PAGO,
        status: Status.PENDING,
        details: cart.map(item => ({
          quantity: item.quantity,
          variantId: item.variant.id,
        }))
      });
      if (response.status === 201) {
        setInitPoint(response.data!.initPoint);
        window.location.href = response.data!.initPoint;
      }
    } catch (error) {
      console.log("Error al realizar la compra", error);
    }
  }

  const handleGoToPay = () => {
    const user = users.find(user => user.id === userActive?.id);
    if (!user?.directions || user.directions.length === 0) {
      console.log(user)
      setOpenModal(true);
    } else {
      setOpenModal(false);
      createOrder();
    }
  }

  return (
    <div className={Styles.container}>
      {openModal ? (
        <div className={Styles.modal}>
          <div className={Styles.modalContent}>
            <h3>Ingrese una Dirección</h3>
            <DirectionForm
              user={userActive!}
              onSuccess={() => setOpenModal(false)}
              onClose={() => setOpenModal(false)} 
            />
            <button onClick={() => setOpenModal(false)} className={Styles.closeButton}>
              <X size={24} />
            </button>
          </div>
        </div>
      ) : (
        <div>
          {cart.length === 0 || !token || token.role === 'ADMIN'
            ?
            <div>
              {/* Carrito vacio */}
              <div className={Styles.emptyCart}>
                <h2 className={Styles.emptyCart__title}>El carrito esta vacio</h2>
                <p className={Styles.emptyCart__text}>Una vez que agregues un producto a tu carrito aparecera aca. Listo para empezar?</p>
                <button className={Styles.emptyCart__button}><Link to={'/products'} className={Styles.button_start}>Empezar <ArrowRight /></Link></button>
              </div>
              {/* Fin Carrito vacio */}
            </div>
            :
            <div className={Styles.cartContainer}>
              {/* Main Carrito con productos */}
              <div className={Styles.cartContainer__main}>
                <h2 className={Styles.cartContainer__main__title}>Tu carrito</h2> {/* Vista del carrito con productos */}
                {cart.map((product) => {
                  return (
                    <CartItem key={product.variant.id} item={product} />
                  )
                })}
              </div>
              {/* Fin Main Carrito con productos */}

              {/* Aside Carrito */}
              <div className={Styles.cartContainer__aside}>
                <ProductSummary 
                  onGoToPay={handleGoToPay}
                />
              </div>
              {/* Fin Aside Carrito */}
            </div>
          }
        </div>
      )}
    </div>
  )
}

export default Shopcart
