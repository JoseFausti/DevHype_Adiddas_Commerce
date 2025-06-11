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


  // Blog Most Interesting
  const placeholderBlogPosts = [
    {
      img: "https://res.cloudinary.com/dxiqjdiz6/image/upload/v1749581578/Most1_iszjth.webp",
      link: "https://news.adidas.com/basketball/adidas-basketball-expands-nil-roster-with-next-generation-of-elite-student-athletes/s/168f99f4-22b5-46c3-962c-af7b602027b7",
      alt: "Interesting Product 1",
    },
    {
      img: "https://res.cloudinary.com/dxiqjdiz6/image/upload/v1749581577/Most_2_tcaebi.webp",
      link: "https://news.adidas.com/bad-bunny/icons-unite-icons--bad-bunny-and-lionel-messi-team-up---celebrate-their-new-adidas-collection/s/fa877aa8-781a-476d-9f18-a5c91d48d224",
      alt: "Interesting Product 2",
    },
    {
      img: "https://res.cloudinary.com/dxiqjdiz6/image/upload/v1749581577/Most_3_y5mezt.webp",
      link: "https://news.adidas.com/more-sports/adidas---mercedes-amg-petronas-f1-team-launch-first-race-specific-collection-with-all-new-summer-pac/s/40c672a1-a76a-42bd-9e84-3e73b4eeffca",
      alt: "Interesting Product 3",
    },
    {
      img: "https://res.cloudinary.com/dxiqjdiz6/image/upload/v1749581578/Most_4_p0xedr.webp",
      link: "https://news.adidas.com/running/adidas-debuts-regionally-exclusive-adizero-desert-runner-collection-with-a-unique-art-piece-in-the-h/s/8b74f81f-6e58-4ea5-8315-3aaf41c86862",
      alt: "Interesting Product 4",
    },
  ];

  return (
    <div className={Styles.home__container}>
      <div className={Styles.home_image_container}>
        <img
          src="https://res.cloudinary.com/dxiqjdiz6/image/upload/f_auto,q_auto/v1747771633/Banner_Principal_jshu2w.png"
          alt="Banner Adidas Mall"
          className={Styles.imagen_responsive}
        />
      </div>
      <div className={Styles.home_content_container}>
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
                src="https://res.cloudinary.com/dxiqjdiz6/image/upload/f_auto,q_auto/v1747771692/modeloDescuentos_uusoqh.jpg"
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
            src="https://res.cloudinary.com/dxiqjdiz6/image/upload/f_auto,q_auto/v1747771689/modelo_history_oqvanc.png"
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
      <div className={Styles.most_interesting__container}>
        {/* Enlace externo en el título "MOST INTERESTING" */}
        <a
          href="https://www.tubloginteresante.com/blog"
          /* Reemplazá este URL si querés que el título lleve a otro sitio */
          target="_blank"
          rel="noopener noreferrer"
          className={Styles.link_interesting}
        >
          <h2 className={Styles.interesting__title}>MOST INTERESTING</h2>
        </a>
        <div className={Styles.placeholder__container}>
          {placeholderBlogPosts.map((post, index) => (
            <a
              key={index}
              href={post.link}  /* Cada imagen te lleva a un blog distinto */
              target="_blank"
              rel="noopener noreferrer"
              className={Styles.placeholder__link}
            >
              <img
                src={post.img}
                alt={post.alt}
                className={Styles.placeholder__image}
              />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;