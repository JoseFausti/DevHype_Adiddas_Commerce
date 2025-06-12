import styles from './TermsOfService.module.css';

const TermsOfService = () => {
  return (
    <div className={styles.container}>
      <h1>Terms of Service</h1>
      <p>
        Welcome to the Adidas website. By accessing or using our services, you agree to be bound by the following Terms of Service. Please read them carefully before using our platform.
      </p>

      <h2>Use of Our Services</h2>
      <p>
        You agree to use our website and services only for lawful purposes and in accordance with these terms. You may not use our services to violate any applicable laws, infringe on the rights of others, or interfere with the operation of the site.
      </p>

      <h2>Account Responsibility</h2>
      <p>
        If you create an account on our website, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this site, including logos, text, graphics, images, and software, is the property of Adidas or its licensors and is protected by intellectual property laws. Unauthorized use of this content is strictly prohibited.
      </p>

      <h2>Modifications</h2>
      <p>
        Adidas reserves the right to update these terms at any time. Continued use of the website after changes are posted constitutes acceptance of those changes.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions regarding these terms, please reach out to our support team via the Contact Us page.
      </p>
    </div>
  );
};

export default TermsOfService;
