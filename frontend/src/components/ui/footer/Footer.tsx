import styles from './Footer.module.css'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
        <footer className={styles.footer__container}>
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
                            width: '60px',
                            height: 'auto'
                        }}
                    />
                </Box>
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
