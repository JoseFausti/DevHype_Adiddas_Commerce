import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import ProductCard from "../../ui/product/ProductCard"

const PurchaseProduct = () => {

  const {id} = useParams<{id: string}>()

  const {products} = useAppSelector((state) => state.product);

  const product = products.find((product) => product.id === Number(id));

  return (
    <div>
      {product 
      ? <ProductCard product={product}/> 
      : 
        <div>
          <h1>Producto no encontrado</h1> 
          <button>
            <Link to={'/products'}>Volver a la tienda</Link>
          </button>
        </div>
      }
    </div>
  )
}

export default PurchaseProduct
