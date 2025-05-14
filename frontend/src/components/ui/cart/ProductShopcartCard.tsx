import { IProduct } from '../../../types/types'
import Styles  from './ProductShopcartCard.module.css';

interface ProductShopcartCardProps {
    product: IProduct;
}

const ProductShopcartCard = ({product}: ProductShopcartCardProps) => {
 return (
    <div key={product.id} className={Styles.productShopcartCard}>
        <div className={Styles.productShopcartCard__details}>
            <img src={product.image} alt={product.name} className={Styles.productShopcartCard__image}/>
            <h3>{product.name}</h3>
            <p>{product.brand}</p>
        </div>
        <div>
            <select name="color" id="color">
                {product.colorImg.map((color) => {
                const {colorImg} = color
                return (
                    <option value={colorImg}><img src={colorImg} alt={colorImg} /></option>
                )
                })}
            </select>
        </div>
        <div>
            {/* Logica para la cantidad de productos dependiendo del stock */}
        </div>
        <div>
            <p>${product.price}</p>
        </div>
        <div>
            <button>X</button>
        </div>
    </div>
  )
}

export default ProductShopcartCard
