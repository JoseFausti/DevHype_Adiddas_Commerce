import styles from './Faq.module.css';

const Faq = () => {
  return (
    <div className={styles.container}>
      <h1>Frequently Asked Questions</h1>

      <h2>Where is my order?</h2>
      <p>
        Once your order is shipped, you will receive an email with tracking information. You can use this to monitor the status and estimated delivery date.
      </p>

      <h2>How can I return an item?</h2>
      <p>
        Items can be returned within 30 days of delivery. Visit our <strong>Shipping & Returns</strong> section for more details and instructions on initiating a return.
      </p>

      <h2>Do you offer size exchanges?</h2>
      <p>
        Yes, exchanges for size are available as long as the item is in stock and in unused condition. Please submit an exchange request through your account.
      </p>

      <h2>What payment methods are accepted?</h2>
      <p>
        We accept Visa, MasterCard, American Express, PayPal, and Adidas gift cards.
      </p>

      <h2>How can I contact customer service?</h2>
      <p>
        You can reach our team through the <strong>Contact Us</strong> page or via live chat from Monday to Friday, 9am–6pm.
      </p>
    </div>
  );
};

export default Faq;
