import styles from './Layout.module.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import SearchBar from './search/SearchBar';
import { ShoppingCart, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getDecodedToken } from '../../utils/functions';
import { Role } from '../../utils/enums';
import DiscountMarquee from './DiscountsMarquee/DiscountMarquee';
import { motion } from "framer-motion";
import Footer from './footer/Footer';

const discountMessages = [
    '50% OFF en zapatillas',
    '2x1 en camisetas',
    '30% OFF en accesorios',
    'Outlet: ¡Hasta 70% OFF'
];

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const [displayUserMenu, setDisplayUserMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const token = getDecodedToken();
    const isAdmin: boolean = token? token && token.role === Role.ADMIN : false;

    // Estado del header
    const [scrollDirection, setScrollDirection] = useState("up");
    const prevScrollPosRef = useRef(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = document.documentElement.scrollTop;
    
            // Cambiar inmediatamente el estado sin suavizados
            if (currentScrollPos > prevScrollPosRef.current) {
                setScrollDirection("down");
            } else {
                setScrollDirection("up");
            }
    
            prevScrollPosRef.current = currentScrollPos;
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);    

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setDisplayUserMenu(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleToggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDisplayUserMenu((prev) => !prev);
    };

    return (
        <div className={styles.layout__container}>
            <motion.header
                key={scrollDirection}
                initial={{ y: 0 }}
                animate={{ y: scrollDirection === "down" ? -100 : 0 }}
                transition={{ duration: 0, ease: "linear" }} // Sin retrasos, cambio inmediato
                className={styles.header__container}
            >

                <div className={styles.header__marquee}>
                    <DiscountMarquee messages={discountMessages} />
                </div>

                <div className={styles.header__menu__container}>
                    <div className={styles.header__logo_and_links}>
                        <div className={styles.header__logo}>
                            <Link to="/">
                                <img src="https://res.cloudinary.com/dxiqjdiz6/image/upload/v1747771636/Logotipo_Adidas_Negro_kmqyhs.png" alt="logo" />
                            </Link>
                        </div>
                        <div className={styles.header__links}>
                            <Link to={{ pathname: "/products", search: '?category=woman' }}>WOMAN</Link>
                            <Link to={{ pathname: "/products", search: '?category=men' }}>MEN</Link>
                            <Link to={{ pathname: "/products", search: '?category=shoes' }}>SHOES</Link>
                            <Link to={{ pathname: "/products", search: '?category=discounts' }}>
                                <span className={styles.discount}>DISCOUNTS</span>
                            </Link>
                        </div>
                    </div>

                    <div className={styles.header__search_login_and_cart}>
                        <SearchBar />
                        <div className={styles.userMenu__container}>
                            <User
                                size={26}
                                color="#000"
                                style={{ cursor: 'pointer' }}
                                onClick={handleToggleMenu}
                            />
                            {displayUserMenu && (
                                <div className={styles.userMenu} ref={menuRef}>
                                    {token ? (
                                        <div>
                                            <div className={styles.userMenu__options}>
                                                {token.role === Role.ADMIN && (
                                                    <Link to="/admin" className={styles.userMenu__option}>
                                                        Admin
                                                    </Link>
                                                )}
                                                <Link to="/logout" className={styles.userMenu__option}>
                                                    Logout
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={styles.userMenu__options}>
                                            <Link to="/login" className={styles.userMenu__option}>
                                                Login
                                            </Link>
                                            <Link to="/register" className={styles.userMenu__option}>
                                                Register
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div style={{display: `${isAdmin ? 'none' : 'flex'}`}}>
                            <ShoppingCart
                                size={24}
                                color="#000"
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate('/shopcart')}
                            />
                        </div>
                    </div>
                </div>
            </motion.header>

            <main>
                <Outlet /> {/* Aca se renderizan las rutas hijas, funciona como un children para las rutas */}
            </main>
            {/* Footer */}        
            <Footer />
        </div>
    )
}

export default Layout
