import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useEffect, useState } from "react";
import { setProductActive, setProducts } from "../../../store/slices/productSlice";
import styles from "./Products.module.css";
import { getAllProducts } from "../../../data/ProductsController";

const Products: React.FC = () => {

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const name = searchParams.get("name");

  const navigate = useNavigate();

  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        if (products.length === 0) {
          const res = await getAllProducts();
          if (res.status === 200) {
            dispatch(setProducts(res.data));
          } else {
            setError(res.error);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
        setLoading(false);
      }
    }
    initialize();
  }, []);

  const filtered = category
  ? category === "discounts"
    ? products.filter((p) => p.discounts && p.discounts.length > 0)
    : category === "shoes"
      ? products.filter((p) =>
          p.category.name === "shoes" && p.discounts.length === 0
        )
      : products.filter((p) => p.category.name === category)
  : name
    ? products.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      )
    : products;

  const visibleProducts = filtered.slice(0, (visibleCount < filtered.length) ? visibleCount : filtered.length);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 12);
      setLoading(false);
    }, 500); // 500 ms de retardo simulado
  };

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>{category}</h1>

        <div className={styles.grid}>
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className={styles.card}
              onClick={() => {
                dispatch(setProductActive(product));
                navigate(`/products/${product.id}`);
              }}
            >
              <div className={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.image}
                />
              </div>

              <div className={styles.info}>
                <div className={styles.left}>
                  <h2 className={styles.name}>
                    {product.name}
                    {product.discounts && product.discounts.length > 0 && (
                      <span className={styles.discountTag}>
                        {" "}
                        -{product.discounts[0].percentage}%
                      </span>
                    )}
                  </h2>
                  {product.discounts && product.discounts.length > 0 ? (
                    <>
                      <p className={styles.oldPrice}>${product.price.toFixed(2)}</p>
                      <p className={styles.discountPrice}>
                        ${(
                          product.price * (1 - product.discounts[0].percentage / 100)
                        ).toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p className={styles.price}>${product.price.toFixed(2)}</p>
                  )}

                </div>
                <button className={styles.readMore}>
                  Read More
                </button>
              </div>
            </div>
          ))}

        </div>

        {visibleCount < filtered.length && (
          <div className={styles.buttonContainer}>
            <button
              onClick={handleLoadMore}
              className={styles.loadMoreButton}
            >
              Ver más
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

