import { Link } from 'react-router-dom';
import Styles from './Home.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IProduct } from '../../../types/types';
import { useCarrousel } from '../../../hooks/useCarrousel'; // Hook actualizado
import { useEffect } from 'react';
import { getAllProducts } from '../../../data/ProductsController';
import { setProducts } from '../../../store/slices/productSlice';
import ProductLandingCard from '../../ui/landing/ProductLandingCard';

const Home: React.FC = () => {
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        if (res.status === 200) {
          dispatch(setProducts(res.data));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        dispatch(setProducts([]));
      }
    };
    fetchProducts();
  }, [dispatch]);

  // Shoes carrusel
  const shoes = products.filter(
    (product) => product.category.name === 'shoes'
  );
  const {
    activeIndex: shoesActiveIndex,
    next: nextShoes,
    prev: prevShoes,
  } = useCarrousel<IProduct>(shoes, 3);

  // Descuentos
  const productsWithDiscount = products.filter(
    (product) => product.discounts.length > 0
  );
  const {
    activeIndex: discountActiveIndex,
    next: nextDiscount,
    prev: prevDiscount,
  } = useCarrousel<IProduct>(productsWithDiscount, 1);

  // Productos interesantes
  const interestingProducts = products.filter(
    (product) => product.category.name === 'interesting'
  );
  const {
    activeIndex: interestingActiveIndex,
    next: nextInteresting,
    prev: prevInteresting,
  } = useCarrousel<IProduct>(interestingProducts, 1);

  return (
    <div className={Styles.home__container}>
      <div className={Styles.home__image__container}>
        <img
          src="https://res.cloudinary.com/dxiqjdiz6/image/upload/v1747771633/Banner_Principal_jshu2w.png"
          alt="Banner Adidas Mall"
          className={Styles.imagen_responsive}
        />
      </div>
      <div className={Styles.home__content__container}>
        <div className={Styles.home__products_and_benefits}>
          <Link
            className={Styles.link_shoes}
            to={{ pathname: '/products', search: '?category=shoes' }}
          >
            <h2 className={Styles.shoes__title}>Shoes<span> that might interest you</span></h2>
          </Link>
          <div className={Styles.home__products}>
            {/* Se pasa la lista completa junto con activeIndex */}
            <ProductLandingCard
              carrousel={shoes}
              activeIndex={shoesActiveIndex}
              next={nextShoes}
              prev={prevShoes}
            />
          </div>
          <div className={Styles.home__benefits}>
            <div className={Styles.home__benefit_image}>
              <img
                src="https://res.cloudinary.com/dxiqjdiz6/image/upload/v1747771692/modeloDescuentos_uusoqh.jpg"
                alt="Modelo Descuentos"
              />
            </div>
            <div className={Styles.home__benefit_text}>
              <h2 className={Styles.benefits__title}>
                OUTFITS FOR <br />
                <span>BENEFITS</span>
              </h2>
              <p className={Styles.benefits__text}>
                <span>60% OFF + free shipping:</span> only for Adidas clients.
              </p>
              <p className={Styles.benefits__text}>
                Check your account and start buying for benefits on{' '}
                <span>Adidas</span>
              </p>
            </div>
          </div>
          <div className={Styles.home__discounts}>
            <div className={Styles.link_discounts}>
              <h2 className={Styles.discount__title}>DISCOUNTED PRODUCTS</h2>
            </div>
            {productsWithDiscount.length > 0 ? (
              <ProductLandingCard
                carrousel={productsWithDiscount}
                activeIndex={discountActiveIndex}
                next={nextDiscount}
                prev={prevDiscount}
              />
            ) : (
              <p>There are no discounts at the moment</p>
            )}
          </div>
        </div>
      </div>
      <div className={Styles.home__history_container}>
        <div className={Styles.home__history_image}>
          <img
            src="https://res.cloudinary.com/dxiqjdiz6/image/upload/v1747771689/modelo_history_oqvanc.png"
            alt="Modelo History and Grace"
          />
        </div>
        <div className={Styles.home__history_title}>
          <h2 className={Styles.history__title}>HISTORY AND GRACE</h2>
        </div>
        <div className={Styles.home__history_text}>
          <p className={Styles.history__text}>
            At adidas, we believe that sports have the power to transform lives.
            It's not just about keeping your body and mind fit; it's about
            bringing people together and creating a community of individuals who
            share the same passion for excellence.
          </p>
          <p className={Styles.history__text}>
            Whether you're a runner, a basketball player, a soccer player, or
            someone who loves to train, you'll find a home with us. Our products
            are designed to meet your needs, no matter what your preferred form of
            exercise may be.
          </p>
          <p className={Styles.history__text}>
            We draw inspiration from the athletes who push themselves to their
            limits every day, and from the technology we develop to help them
            achieve their goals.
          </p>
          <p className={Styles.history__text}>
            We're not just present on the playing field, either. You'll find the
            three stripes at music festivals, on stages, and in the city streets.
          </p>
        </div>
        <div className={Styles.home__history_footer}>
          <h4 className={Styles.text_footer}>
            To improve performances. Improve lives <br />
            and change de world
          </h4>
        </div>
      </div>
      <div className={Styles.carrousel__container}>
        <Link
          to={{ pathname: '/products', search: '?category=interesting' }}
          className={Styles.link_interesting}
        >
          <h2 className={Styles.interesting__title}>MOST INTERESTING</h2>
        </Link>
        <div className={Styles.home__products}>
          {interestingProducts.length > 0 ? (
            <ProductLandingCard
              carrousel={interestingProducts}
              activeIndex={interestingActiveIndex}
              next={nextInteresting}
              prev={prevInteresting}
            />
          ) : (
            <p>There are no interesting products at the moment</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
