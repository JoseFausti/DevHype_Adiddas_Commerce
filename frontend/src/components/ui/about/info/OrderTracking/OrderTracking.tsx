import styles from './OrderTracking.module.css';

const OrderTracking = () => {
  return (
    <div className={styles.container}>
      <h1>Order Tracking</h1>

      <section className={styles.section}>
        <p>
          Tracking your Adidas order is simple and convenient. Once your package has shipped, you will receive an email containing your unique tracking number and a direct link to the carrier's tracking portal. Use this information to stay updated on the delivery status of your purchase in real-time.
        </p>
      </section>

      <section className={styles.section}>
        <h2>1. How to Track Your Order</h2>
        <ol>
          <li>Locate the shipping confirmation email sent to your inbox after your order ships.</li>
          <li>Click the tracking link provided in the email to view the real-time status and estimated delivery date.</li>
          <li>Alternatively, log in to your Adidas account and navigate to <strong>My Orders</strong> to check the status of your recent purchases.</li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2>2. Tracking Information Delays</h2>
        <p>
          Please note that it may take up to 24 hours after shipment for tracking information to become available on the carrier's site. If you have not seen tracking updates after this period, please contact Adidas customer support for assistance.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Common Tracking Issues</h2>
        <ul>
          <li><strong>Tracking number not working:</strong> Verify the tracking number and try again after a few hours.</li>
          <li><strong>Package status stuck:</strong> Sometimes tracking statuses do not update immediately due to delays in carrier scanning.</li>
          <li><strong>Lost package:</strong> If your package is marked delivered but not received, please check with neighbors or your local post office and then contact support if unresolved.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>4. Contacting Customer Support</h2>
        <p>
          If you need further help tracking your order or have any concerns regarding delivery, please reach out to our customer service team. You can contact us via the <strong>Contact Us</strong> page, by email, or phone. We are committed to helping you receive your order promptly and smoothly.
        </p>
        <p>
          <strong>Email:</strong> support@adidas.com <br />
          <strong>Phone:</strong> +1 (800) 555-ADIDAS <br />
          <strong>Live Chat:</strong> Available Monday to Friday, 9am–6pm
        </p>
      </section>
    </div>
  );
};

export default OrderTracking;
