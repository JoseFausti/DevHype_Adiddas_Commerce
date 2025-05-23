import styles from './Layout.module.css'; 
import { Link, Outlet, useNavigate } from 'react-router-dom';
import SearchBar from './search/SearchBar';
import { ShoppingCart, User } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useState, useEffect, useRef } from 'react';
import { getDecodedToken } from '../../utils/functions';
import { Role } from '../../utils/enums';

const Layout: React.FC = () => {

    const navigate = useNavigate();

    const [displayUserMenu, setDisplayUserMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const token  = getDecodedToken(); // Obtenemos el token ya decodificado para manejar el rol y el nombre de usuario
    
    // Manejo del evento de clic fuera del menú de usuario
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setDisplayUserMenu(false);
        }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
        document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleToogleMenu = (e: React.MouseEvent) => {
        e.stopPropagation(); // Evita que el evento de clic se propague al documento
        setDisplayUserMenu((prev) => !prev);
    }


    return (
        <div className={styles.layout__container}>
            {/* Header */}
            <header className={styles.header__container}>
                {/* Marquee */}
                <div className={styles.header__marquee}>
                    <span>Hola mundo — Bienvenido — JavaScript — React — TypeScript —</span>{/* Mostramos palabras al azar en movimiento */}
                </div>
                {/* Header Menu */}
                <div className={styles.header__menu__container}>
                    <div className={styles.header__logo_and_links}>
                        {/* Logo */}
                        <div className={styles.header__logo}>
                            <Link to="/">
                                <img src="./public/assets/Adidas_Logo.svg" alt="logo"/>
                            </Link>
                        </div>
                        {/* Links */}
                        <div className={styles.header__links}>
                            <Link to={{pathname: "/products", search: '?category=woman'}}>WOMAN</Link>
                            <Link to={{pathname: "/products", search: '?category=men'}}>MEN</Link>
                            <Link to={{pathname: "/products", search: '?category=shoes'}}>SHOES</Link> 
                            <Link to={{pathname: "/products", search: '?category=discounts'}}><span className={styles.discount}>DISCOUNTS</span></Link>
                        </div>
                    </div>
                    {/* Search + Icons */}
                    <div className={styles.header__search_login_and_cart}>
                        <SearchBar />
                        <div className={styles.userMenu__container}>
                            <User size={26} color="#000" style={{ cursor: 'pointer' }} onClick={handleToogleMenu}/>
                            {displayUserMenu && (
                                <div className={styles.userMenu} ref={menuRef}>
                                    {token ? (
                                        <div className={styles.userMenu__options}>
                                            <h5>{token.username}</h5>
                                            {token.role === Role.ADMIN && (
                                                <Link to="/admin" className={styles.userMenu__option}>Admin</Link>
                                            )}
                                            <Link to="/logout" className={styles.userMenu__option}>Logout</Link>
                                        </div>
                                    ) : (
                                        <div className={styles.userMenu__options}>
                                            <Link to="/login" className={styles.userMenu__option}>Login</Link>
                                            <Link to="/register" className={styles.userMenu__option}>Register</Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            <ShoppingCart size={24} color="#000" style={{ cursor: 'pointer' }} onClick={() => navigate('/shopcart')}/>
                        </div>
                    </div>
                </div>
            </header>
            {/* Content */}
            <main>
                <Outlet /> {/* Aca se renderizan las rutas hijas, funciona como un children para las rutas */}
            </main>
            {/* Footer */}
            <footer className={styles.footer__container}>
                <div className={styles.adidasImage}>
                    <img
                        src="/assets/Logotipo Adidas Blanco.png"
                        alt="Adidas Logo"
                        className={styles.adidasLogo}
                    />
                </div>
                <div className={styles.footer__components__container}>
                    <div className={styles.footer__elements}>
                        <h2>Info</h2>
                        <ul>
                            <li>About Us</li>
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                            <li>Shipping Policy</li>
                        </ul>
                    </div>
                    <div className={styles.footer__elements}>
                        <h2>Collections</h2>
                        <ul>
                            <li>Men</li>
                            <li>Women</li>
                            <li>Shoes</li>
                            <li>Discounts</li>
                        </ul>
                    </div>
                    <div className={styles.footer__elements}>
                        <h2>Support</h2>
                        <ul>
                            <li>FAQ</li>
                            <li>Shipping & Returns</li>
                            <li>Order Tracking</li>
                            <li>Size Guide</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className={styles.footer__elements}>
                        <h2>Follow Us</h2>
                        <div className={styles.socialIcons}>
                            <a href="https://www.facebook.com/Adidas" target="_blank" rel="noopener noreferrer">
                                <FaFacebook style={{ height: 30, width: 30 , margin: 10, color: 'white'}} />
                            </a>
                            <a href="https://www.instagram.com/adidas/" target="_blank" rel="noopener noreferrer">
                                <FaInstagram style={{ height: 30, width: 30 , margin: 10, color: 'white'}} />
                            </a>
                            <a href="https://twitter.com/Adidas" target="_blank" rel="noopener noreferrer">
                                <FaXTwitter style={{ height: 30, width: 30 , margin: 10, color: 'white'}} />
                            </a>
                            <a href="https://www.youtube.com/user/Adidas" target="_blank" rel="noopener noreferrer">
                                <FaYoutube style={{ height: 30, width: 30 , margin: 10, color: 'white'}} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.footer__payment}>
                    <p>Visa</p>
                    <p>Mastercard</p>
                    <p>American Express</p>
                </div>
            </footer>
        </div>
    )
}

export default Layout
