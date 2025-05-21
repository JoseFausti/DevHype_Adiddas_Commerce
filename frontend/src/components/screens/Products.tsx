import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../data/ProductsController";
import { setProductActive, setProducts } from "../../store/slices/productSlice";

const Products: React.FC = () => {

  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  const { products, productActive } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getAllProducts();
        if (response.status === 200) {
          dispatch(setProducts(response.data));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (productActive) {
      navigate(`/product/${productActive.id}`);
    }
  }, [productActive]);

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  const visibleProducts = filtered.slice(0, (visibleCount < filtered.length) ? visibleCount : filtered.length);

  const handleLoadMore = () => {
    setLoading(true);
    setVisibleCount((prev) => prev + 12);
  };

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;

  return (
    <>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition" onClick={() => dispatch(setProductActive(product))}>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-700">${product.price}</p>
            </div>
          ))}
        </div>

        {visibleCount < filtered.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Ver más
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;

