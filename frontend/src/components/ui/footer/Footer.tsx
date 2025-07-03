import styles from './Footer.module.css'
import { ArrowRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className={styles.footer__container}>
                <div className={styles.adidasInfo}>
                    <h1>ADIDAS SPORTSWEAR: PERFORMANCE, STYLE, AND INNOVATION SINCE 1949</h1>

                    <p>Sports keep us fit. They keep us alert. They bring us together. Through sports, we have the power to change lives, inspiring with stories of athletes, innovating with technology, and empowering you to get moving.</p>

                    <p>Find high-performance sportswear here with the latest technology to help you push your limits. Whether you're a runner, a basketball player, a soccer player, or someone who simply loves to stay active, our sports store is your home. We're here to help you train harder, run faster, and go further with products that adapt to your movements and support your goals.</p>

                    <p>Explore our online store and discover the new adidas collections where innovation and style meet. The adidas sports store offers high-performance gear for all levels, whether you're an elite athlete, a fitness enthusiast, or just starting your journey. Our online store ensures that, wherever you are, you can access the latest clothing designed for movement.</p>

                    <p>The adidas Sportswear Store is much more than a place to shop: it's a space for creators to elevate their game and redefine what's possible. Every item in our Sportswear Store is designed with performance, durability, and attention to detail in mind, helping you move with confidence. At adidas, we partner with the best in the industry to co-create, ensuring every piece of apparel supports movement, individual expression, and an active lifestyle. No matter where your sport takes you, our store has you covered, helping you take every step toward greatness.</p>
                </div>

                <div className={styles.adidasImage}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box
                            component="img"
                            src="https://res.cloudinary.com/dxiqjdiz6/image/upload/v1747771632/Logotipo_Adidas_Blanco_ynr7sh.png"
                            alt="Logo"
                            sx={{
                                width: '40px',
                                height: 'auto'
                            }}
                        />
                    </Box>
                </div>

                <div className={styles.adidasBanner}>
                    <div className={styles.adidasBanner__content}>
                        <h1>UNITE A ADIDAS Y CONOCE MÁS</h1>
                        <Link to="/register" className={styles.userMenu__option}>
                            REGISTER NOW <ArrowRight size={23} style={{ marginLeft: "8px" }} />
                        </Link>
                    </div>
                </div>

                <div className={styles.footer__components__container}>
                    <div className={styles.footer__elements}>
                        <h2>Info</h2>
                        <ul>
                            <li><Link to={{ pathname: '/about', search: '?q=about' }}>About Us</Link></li>
                            <li><Link to={{ pathname: '/about', search: '?q=privacy' }}>Privacy Policy</Link></li>
                            <li><Link to={{ pathname: '/about', search: '?q=terms' }}>Terms of Service</Link></li>
                            <li><Link to={{ pathname: '/about', search: '?q=shipping' }}>Shipping Policy</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footer__elements}>
                        <h2>Collections</h2>
                        <ul>
                            <li><Link to={{ pathname: '/products', search: '?category=men' }}>Men</Link></li>
                            <li><Link to={{ pathname: '/products', search: '?category=woman' }}>Woman</Link></li>
                            <li><Link to={{ pathname: '/products', search: '?category=shoes' }}>Shoes</Link></li>
                            <li><Link to={{ pathname: '/products', search: '?category=discounts' }}>Discounts</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footer__elements}>
                        <h2>Support</h2>
                        <ul>
                            <li><Link to={{ pathname: '/about', search: '?q=faq' }}>FAQ</Link></li>
                            <li><Link to={{ pathname: '/about', search: '?q=shipping-returns' }}>Shipping & Returns</Link></li>
                            <li><Link to={{ pathname: '/about', search: '?q=tracking' }}>Order Tracking</Link></li>
                            <li><Link to={{ pathname: '/about', search: '?q=size-guide' }}>Size Guide</Link></li>
                            <li><Link to={{ pathname: '/about', search: '?q=contact' }}>Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footer__elements}>
                        <h2>Follow Us</h2>
                        <div className={styles.socialIcons}>
                            <a href="https://www.facebook.com/Adidas" target="_blank" rel="noopener noreferrer">
                                <FaFacebook style={{ height: 30, width: 30, margin: 10, color: 'white' }} />
                            </a>
                            <a href="https://www.instagram.com/adidas/" target="_blank" rel="noopener noreferrer">
                                <FaInstagram style={{ height: 30, width: 30, margin: 10, color: 'white' }} />
                            </a>
                            <a href="https://twitter.com/Adidas" target="_blank" rel="noopener noreferrer">
                                <FaXTwitter style={{ height: 30, width: 30, margin: 10, color: 'white' }} />
                            </a>
                            <a href="https://www.youtube.com/user/Adidas" target="_blank" rel="noopener noreferrer">
                                <FaYoutube style={{ height: 30, width: 30, margin: 10, color: 'white' }} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.footer__payment}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        gap={3}
                    >
                        <Box component="img"
                            src="https://res.cloudinary.com/dxiqjdiz6/image/upload/v1748364963/American_Express_Logo_qujxxz.png"
                            alt="American Express"
                            sx={{ width: 'auto', height: 50 }}
                        />
                        <Box component="img"
                            src="https://res.cloudinary.com/dxiqjdiz6/image/upload/v1748371655/mastercard_niltei.png"
                            alt="Mastercard"
                            sx={{ width: 'auto', height: 40 }}
                        />
                        <Box component="img"
                            src="https://res.cloudinary.com/dxiqjdiz6/image/upload/v1748371655/visa_logo_zslxpf.png"
                            alt="Visa"
                            sx={{ width: 'auto', height: 20 }}
                        />
                    </Box>
                </div>
            </footer>
        </>
    )
}

export default Footer
