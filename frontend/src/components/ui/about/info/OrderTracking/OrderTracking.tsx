import styles from './OrderTracking.module.css';

const OrderTracking = () => {
  return (
    <div className={styles.container}>
      <h1>Order Tracking</h1>
      <p>
        Track your Adidas order easily using your tracking number. Once your package ships, you'll receive an email with a tracking link.
      </p>

      <h2>How to Track</h2>
      <ol>
        <li>Go to the shipping confirmation email we sent you.</li>
        <li>Click on the tracking link to see the real-time status of your delivery.</li>
        <li>You can also log in to your Adidas account and view order status under “My Orders”.</li>
      </ol>

      <h2>Tracking Not Available?</h2>
      <p>
        Please allow up to 24 hours for tracking information to update after your order ships. If it’s been longer and there’s still no update, contact our support team.
      </p>

      <h2>Contact Us</h2>
      <p>
        Still need help? Reach out through the <strong>Contact Us</strong> page, and we’ll be happy to assist you.
      </p>
    </div>
  );
};

export default OrderTracking;
