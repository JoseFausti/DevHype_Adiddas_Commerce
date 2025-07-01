import styles from './Faq.module.css';

const Faq = () => {
  return (
    <div className={styles.container}>
      <h1>Frequently Asked Questions</h1>

      <section className={styles.section}>
        <h2>1. Order Status & Tracking</h2>
        <h3>Where is my order?</h3>
        <p>
          Once your order has shipped, you will receive an email containing tracking information. You can use the tracking number on the carrier’s website or in your Adidas account to monitor your shipment status and estimated delivery date.
        </p>
        <h3>Can I change my shipping address after placing an order?</h3>
        <p>
          If your order has not yet shipped, please contact customer service immediately. We will do our best to update the shipping address, but changes cannot be guaranteed once the order is in transit.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Returns & Exchanges</h2>
        <h3>How can I return an item?</h3>
        <p>
          Items can be returned within 30 days of delivery in their original condition. Visit our <strong>Shipping & Returns</strong> section for detailed instructions on initiating a return.
        </p>
        <h3>Do you offer size exchanges?</h3>
        <p>
          Yes! You can exchange items for a different size if they are in stock and unused. Submit an exchange request through your Adidas account or contact customer support for assistance.
        </p>
        <h3>What if my return is damaged or lost?</h3>
        <p>
          We recommend using tracked shipping for returns. Adidas is not responsible for items lost or damaged in transit during returns. Please keep your receipt or tracking information.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Payments & Pricing</h2>
        <h3>What payment methods are accepted?</h3>
        <p>
          We accept Visa, MasterCard, American Express, PayPal, and Adidas gift cards as payment methods.
        </p>
        <h3>Are prices inclusive of taxes and duties?</h3>
        <p>
          Prices displayed include applicable local taxes where required. For international orders, customs duties and import taxes may apply and are the responsibility of the recipient.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Product Information</h2>
        <h3>Are products authentic?</h3>
        <p>
          Absolutely. All products sold on Adidas.com are 100% authentic and come with Adidas' full warranty and support.
        </p>
        <h3>How do I find the right size?</h3>
        <p>
          Visit our <strong>Size Guide</strong> page for detailed sizing charts and tips to ensure the perfect fit.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. Customer Support & Contact</h2>
        <h3>How can I contact customer service?</h3>
        <p>
          Our customer service team is available via the <strong>Contact Us</strong> page or live chat Monday to Friday from 9am to 6pm.
        </p>
        <h3>What if I have a complaint or feedback?</h3>
        <p>
          We welcome your feedback. Please submit any complaints or suggestions through our <strong>Feedback</strong> form or contact customer service directly. We aim to respond promptly and improve your experience.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Privacy & Security</h2>
        <h3>Is my personal information secure?</h3>
        <p>
          Yes. Adidas employs advanced security measures including encryption and secure servers to protect your data.
        </p>
        <h3>How is my data used?</h3>
        <p>
          Please see our <strong>Privacy Policy</strong> for detailed information on how we collect, use, and protect your personal information.
        </p>
      </section>
    </div>
  );
};

export default Faq;
