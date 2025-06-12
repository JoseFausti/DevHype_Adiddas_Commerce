import styles from './ShippingPolicy.module.css';

const ShippingPolicy = () => {
  return (
    <div className={styles.container}>
      <h1>Shipping Policy</h1>
      <p>
        At Adidas, we aim to deliver your orders quickly and reliably. Below you will find details about our shipping process, timelines, and costs.
      </p>

      <h2>Shipping Options & Times</h2>
      <ul>
        <li><strong>Standard Shipping:</strong> 3–7 business days</li>
        <li><strong>Express Shipping:</strong> 1–3 business days</li>
        <li><strong>International Shipping:</strong> 7–14 business days (may vary by region)</li>
      </ul>

      <h2>Order Processing</h2>
      <p>
        Orders are typically processed within 1–2 business days. Once shipped, you will receive a confirmation email with tracking details.
      </p>

      <h2>Shipping Costs</h2>
      <p>
        Shipping costs are calculated at checkout based on your location and selected shipping method. Free standard shipping may apply for orders over a certain amount.
      </p>

      <h2>Delivery Issues</h2>
      <p>
        If your package is delayed, lost, or arrives damaged, please contact our support team as soon as possible so we can assist you.
      </p>
    </div>
  );
};

export default ShippingPolicy;
