import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import ProductCard from "../ui/product/ProductCard";

const ProductDetail = () => {

  const { productActive } = useAppSelector((state) => state.product);

  const navigate = useNavigate();

  const variant = productActive?.variants.find(
    (variant) => variant.product.id === productActive.id
  );

  if (!productActive || !variant) {
    return (
        <div>
            <p className="text-center mt-10">No se encontró el producto.</p>
            <button onClick={() => navigate(-1)}>Volver</button>
        </div>
    );
  }


  return (
    <div className="p-6">
      <ProductCard productVariant={variant} />
    </div>
  );
};

export default ProductDetail;
