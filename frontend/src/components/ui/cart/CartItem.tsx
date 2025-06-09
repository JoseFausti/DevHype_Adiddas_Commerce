import { ICartItem } from "../../../types/types";

interface ProductCartProps {
    item: ICartItem;
}

const CartItem = ({ item }: ProductCartProps) => {
  return (
    <div>
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
