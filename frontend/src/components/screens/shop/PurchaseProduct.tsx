import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import ProductCard from "../../ui/product/ProductCard"
import { useEffect, useState } from "react";
import { findProductById } from "../../../data/ProductsController";
import { setProductActive } from "../../../store/slices/productSlice";

const PurchaseProduct = () => {

  const {id} = useParams<{id: string}>()
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await findProductById(Number(id!));
        if (response.status === 200) {
          dispatch(setProductActive(response.data));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
        dispatch(setProductActive(null));
        navigate('/products');
      }
    }
    fetchProduct()
  }, [id])

  const { productActive: product } = useAppSelector((state) => state.product);

  return (
    <>
      { loading ? <h3 style={{color: 'black'}}>Cargando...</h3> :
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
      }
    </>
  )
}

export default PurchaseProduct
