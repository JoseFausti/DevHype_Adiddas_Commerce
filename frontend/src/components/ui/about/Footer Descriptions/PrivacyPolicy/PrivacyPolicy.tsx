import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <h1>Privacy Policy</h1>
      <p>
        At Adidas, we respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website and services.
      </p>
      <h2>Information We Collect</h2>
      <p>
        We may collect personal information such as your name, email address, shipping address, and payment details when you make a purchase or create an account. Additionally, we gather data related to your browsing behavior through cookies and analytics tools.
      </p>
      <h2>How We Use Your Information</h2>
      <p>
        The data we collect helps us:
      </p>
      <ul>
        <li>Process your orders and manage your account</li>
        <li>Improve your shopping experience</li>
        <li>Communicate updates, promotions, and relevant offers</li>
        <li>Ensure the security of our website</li>
      </ul>
      <h2>Your Rights</h2>
      <p>
        You have the right to access, modify, or delete your personal information. You can also opt out of receiving promotional emails at any time by following the unsubscribe link included in each communication.
      </p>
      <h2>Contact Us</h2>
      <p>
        For any questions or concerns regarding our privacy practices, please contact our customer service team through the Contact Us section.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
