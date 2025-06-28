import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useEffect, useState } from "react";
import { setProductActive, setProducts } from "../../../store/slices/productSlice";
import styles from "./Products.module.css";
import { getAllProducts } from "../../../data/ProductsController";
import { findCategoryByName } from "../../../data/CategoriesController";

const Products: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const type = searchParams.get("type");
  const name = searchParams.get("name");

  const navigate = useNavigate();

  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setVisibleCount(12);
  }, [category, type, name, sort]);

  const [error, setError] = useState<string | null>(null);
  const [types, setTypes] = useState<string[]>([]);

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

    const fetchTypes = async () => {
      try {
        const res = await findCategoryByName(category!);
        if (res.status === 200) {
          const types = new Set(res.data!.types.map((type) => type.name));
          setTypes(Array.from(types));
        }
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };
    fetchTypes();
  }, [category]);

  // Filtrado
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

  // Ordenamiento
  // Ordenar por precio
  if (sort === "price_asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    filtered.sort((a, b) => b.price - a.price);
    // Ordenar por nombre
  } else if (sort === "name_asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "name_desc") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Ordenar por Tipo de producto
  const finalFiltered = type
    ? filtered.filter((p) => p.type.name === type)
    : filtered;

  const visibleProducts = finalFiltered.slice(0, (visibleCount < filtered.length) ? visibleCount : finalFiltered.length);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 12);
      setLoadingMore(false);
    }, 500);
  };

  if (loading)
    return <p className="text-center mt-10">Cargando productos...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>{category}</h1>

        <div
          className={styles.sortContainer}
          style={{ display: filtered.length === 0 ? "none" : "flex" }}
        >
          <div className={styles.sortGroup}>
            <label className={styles.label}>FILTRAR Y ORDENAR</label>

            <div className={styles.dropdownGroup}>
              <select
                className={styles.selectSort}
                onChange={(e) => {
                  const value = e.target.value;
                  const updatedParams = new URLSearchParams(searchParams);

                  if (value) {
                    updatedParams.set("sort", value);
                  } else {
                    updatedParams.delete("sort");
                  }

                  setSearchParams(updatedParams);
                }}
                value={sort || ""}
              >
                <option value="">Sin ordenamiento</option>
                <option value="price_asc">Precio: Menor a mayor</option>
                <option value="price_desc">Precio: Mayor a menor</option>
                <option value="name_asc">Nombre: A-Z</option>
                <option value="name_desc">Nombre: Z-A</option>
              </select>

              <select
                className={styles.selectSort}
                onChange={(e) => {
                  const value = e.target.value;
                  const updatedParams = new URLSearchParams(searchParams);

                  if (value) {
                    updatedParams.set("type", value);
                  } else {
                    updatedParams.delete("type");
                  }

                  setSearchParams(updatedParams);
                }}
                value={types.includes(type ?? "") ? type ?? "" : ""}
              >
                <option value="">Filtrar por tipo</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
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

        {visibleCount < finalFiltered.length && (
          <div className={styles.buttonContainer}>
            <button
              onClick={handleLoadMore}
              className={styles.loadMoreButton}
              disabled={loadingMore}
            >
              {loadingMore ? "Cargando..." : "Ver más"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

