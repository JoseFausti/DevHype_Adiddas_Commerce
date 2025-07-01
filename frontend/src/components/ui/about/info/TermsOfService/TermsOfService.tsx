import styles from './TermsOfService.module.css';

const TermsOfService = () => {
  return (
    <div className={styles.container}>
      <h1>Terms of Service</h1>

      <section className={styles.section}>
        <p>
          Welcome to the Adidas website. By accessing, browsing, or using our services, you acknowledge that you have read, understood, and agree to be bound by the following Terms of Service. These terms apply to all users, including visitors, customers, and account holders.
        </p>
      </section>

      <section className={styles.section}>
        <h2>1. Use of Our Services</h2>
        <p>
          You agree to use our website and services solely for lawful and personal purposes. You are prohibited from:
        </p>
        <ul>
          <li>Violating any applicable laws or regulations</li>
          <li>Infringing on the rights of others, including intellectual property rights</li>
          <li>Engaging in fraudulent, harmful, or deceptive practices</li>
          <li>Attempting to gain unauthorized access to our systems or user accounts</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>2. Account Responsibility</h2>
        <p>
          When you create an account on our website, you are responsible for maintaining the confidentiality of your login credentials and for any activity that occurs under your account. Adidas is not liable for any loss or damage resulting from unauthorized access to your account.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Orders & Payments</h2>
        <p>
          All orders placed through our platform are subject to availability and acceptance. Prices are subject to change without notice. Payment must be made at the time of purchase using authorized payment methods. Adidas reserves the right to refuse or cancel any order at our discretion.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Shipping & Returns</h2>
        <p>
          We strive to deliver your products promptly. Shipping times and return policies are outlined in our dedicated Shipping and Returns pages. By placing an order, you agree to these terms and any related conditions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. Intellectual Property</h2>
        <p>
          All content, trademarks, logos, graphics, images, and software on this site are the property of Adidas or its licensors and are protected by intellectual property laws. Reproduction, distribution, or unauthorized use of any content is strictly prohibited without prior written consent.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. User Content & Feedback</h2>
        <p>
          Any content you submit (e.g., reviews, comments, suggestions) becomes the property of Adidas. We may use, reproduce, or distribute this content for marketing or service improvement without any obligation to compensate you.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Third-Party Links</h2>
        <p>
          Our site may contain links to third-party websites or services. We are not responsible for the content, privacy practices, or accuracy of external sites. Access them at your own risk.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Adidas shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services, including but not limited to loss of data, profits, or business interruption.
        </p>
      </section>

      <section className={styles.section}>
        <h2>9. Termination</h2>
        <p>
          Adidas reserves the right to suspend or terminate your access to the website at any time, without notice, if we believe you have violated these Terms of Service or acted in a way that could harm our brand or users.
        </p>
      </section>

      <section className={styles.section}>
        <h2>10. Modifications</h2>
        <p>
          We may revise these terms at any time. Changes will be posted on this page with an updated revision date. Continued use of the site after changes are posted indicates your acceptance of the revised terms.
        </p>
      </section>

      <section className={styles.section}>
        <h2>11. Governing Law</h2>
        <p>
          These Terms of Service are governed by and construed in accordance with the laws of the country in which Adidas operates. Any disputes will be subject to the exclusive jurisdiction of the competent courts in that region.
        </p>
      </section>

      <section className={styles.section}>
        <h2>12. Contact Us</h2>
        <p>
          If you have any questions about these terms, your account, or our services, please contact our support team through the <strong>Contact Us</strong> page or at:
          <br /><br />
          <strong>Email:</strong> legal@adidas.com <br />
          <strong>Phone:</strong> +1 (800) 555-ADIDAS <br />
          <strong>Address:</strong> Adidas Legal Department, 5055 N. Greeley Ave, Portland, OR 97217
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
