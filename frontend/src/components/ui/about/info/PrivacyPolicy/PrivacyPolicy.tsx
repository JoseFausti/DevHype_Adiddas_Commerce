import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <h1>Privacy Policy</h1>

      <section className={styles.section}>
        <p>
          At Adidas, we are committed to safeguarding your privacy and protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and store your information when you interact with our website, applications, and services.
        </p>
      </section>

      <section className={styles.section}>
        <h2>1. Information We Collect</h2>
        <p>We collect various types of information, including:</p>
        <ul>
          <li><strong>Personal identification:</strong> name, email address, shipping/billing address, phone number</li>
          <li><strong>Account information:</strong> login credentials, order history, saved preferences</li>
          <li><strong>Payment information:</strong> credit/debit card details (processed securely via third-party gateways)</li>
          <li><strong>Device & usage data:</strong> browser type, IP address, time zone, clicks, session length</li>
          <li><strong>Location data:</strong> if permitted, we may access your location to tailor content and services</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>2. How We Use Your Data</h2>
        <p>Your data is used to provide a personalized and secure experience. Key uses include:</p>
        <ul>
          <li>Processing orders, payments, and returns</li>
          <li>Sending updates, receipts, and promotional content</li>
          <li>Enhancing and optimizing website performance</li>
          <li>Detecting fraudulent or suspicious activity</li>
          <li>Complying with legal obligations and regulatory requirements</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>3. Cookies and Tracking Technologies</h2>
        <p>
          Our website uses cookies, pixel tags, and similar technologies to enhance your browsing experience. Cookies allow us to remember your preferences, analyze site traffic, and deliver relevant ads. You can manage or disable cookies in your browser settings at any time.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Sharing Your Information</h2>
        <p>
          We do not sell your personal information. We may share your data with trusted third parties such as:
        </p>
        <ul>
          <li>Payment processors and shipping carriers</li>
          <li>Marketing and analytics service providers</li>
          <li>Technology partners helping to operate our platform</li>
          <li>Law enforcement or legal authorities when required</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>5. Data Retention</h2>
        <p>
          We retain your information only as long as necessary to fulfill the purposes outlined in this policy, including legal, accounting, or reporting requirements. You may request deletion of your account and personal data at any time.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request corrections or updates to your information</li>
          <li>Withdraw consent or delete your account</li>
          <li>Object to certain uses of your data</li>
          <li>Opt out of promotional communications at any time</li>
        </ul>
        <p>
          To exercise these rights, contact us using the details below.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Security Measures</h2>
        <p>
          We implement strong security protocols, including encryption, secure socket layer (SSL) technology, and regular vulnerability testing to protect your data from unauthorized access, alteration, or disclosure.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. International Transfers</h2>
        <p>
          Your data may be transferred and stored in countries outside your own. When we do so, we ensure that appropriate safeguards are in place in accordance with applicable data protection laws.
        </p>
      </section>

      <section className={styles.section}>
        <h2>9. Children’s Privacy</h2>
        <p>
          Our services are not intended for children under the age of 13. We do not knowingly collect data from minors. If we become aware of such data, it will be deleted promptly.
        </p>
      </section>

      <section className={styles.section}>
        <h2>10. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy to reflect changes in our practices or legal requirements. Updates will be posted on this page with a revised "Last Updated" date.
        </p>
      </section>

      <section className={styles.section}>
        <h2>11. Contact Us</h2>
        <p>
          If you have questions, concerns, or wish to exercise your privacy rights, please contact our customer support team via the <strong>Contact Us</strong> page or at: <br />
          <br />
          <strong>Email:</strong> support@adidas.com <br />
          <strong>Phone:</strong> +1 (800) 555-ADIDAS <br />
          <strong>Address:</strong> Adidas North America, 5055 N. Greeley Ave, Portland, OR 97217
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
