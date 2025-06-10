import { IDetail } from "../../../types/types";
import Styles from "./CartItem.module.css"; 

interface ProductCartProps {
    item: IDetail;
}

const CartItem = ({ item }: ProductCartProps) => {
  return (
    <div className={Styles.cartItemContainer}>
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <h3></h3>
        <p></p>
      </div>
    </div>
  )
}

export default CartItem
