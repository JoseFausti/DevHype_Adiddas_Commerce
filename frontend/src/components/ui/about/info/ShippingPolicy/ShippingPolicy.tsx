import styles from './ShippingPolicy.module.css';

const ShippingPolicy = () => {
  return (
    <div className={styles.container}>
      <h1>Shipping Policy</h1>

      <section className={styles.section}>
        <p>
          At Adidas, we strive to ensure your order arrives on time and in perfect condition. This Shipping Policy outlines the available shipping methods, estimated delivery times, costs, and what to do in case of issues.
        </p>
      </section>

      <section className={styles.section}>
        <h2>1. Shipping Options & Estimated Delivery Times</h2>
        <ul>
          <li><strong>Standard Shipping:</strong> 3–7 business days</li>
          <li><strong>Express Shipping:</strong> 1–3 business days</li>
          <li><strong>Overnight Shipping:</strong> Available in select areas for orders placed before 12:00 PM</li>
          <li><strong>International Shipping:</strong> 7–14 business days (may vary by country and customs clearance)</li>
        </ul>
        <p>
          Delivery times are estimates and may vary due to holidays, weather, customs, or high order volumes.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Order Processing Time</h2>
        <p>
          Orders are processed Monday through Friday, excluding holidays. Most orders are processed within 1–2 business days. You will receive a confirmation email once your order has shipped, including tracking information.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Shipping Costs</h2>
        <p>
          Shipping charges are calculated during checkout based on your delivery location and selected shipping method. We offer:
        </p>
        <ul>
          <li>Free Standard Shipping on orders over $100</li>
          <li>Discounted Express rates during select promotional periods</li>
          <li>International shipping fees based on destination and package weight</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>4. Shipping Restrictions</h2>
        <p>
          We currently do not ship to P.O. boxes, military addresses (APO/FPO), or certain remote regions. Hazardous materials, if included in your order, may require special handling and affect shipping eligibility.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. Tracking Your Order</h2>
        <p>
          Once your order has shipped, you will receive a tracking number via email. You can track your shipment through the carrier’s website or from your Adidas account under “Order History.” Tracking may take up to 24 hours to activate.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Delivery Delays & Issues</h2>
        <p>
          While we aim for timely delivery, delays can occur due to weather, customs, or other factors. If your order hasn’t arrived after the estimated delivery window, or if it arrives damaged, please contact our support team immediately. We’ll investigate and offer a resolution such as a replacement, refund, or credit.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Wrong Address Disclaimer</h2>
        <p>
          It is the customer’s responsibility to ensure the delivery address provided is accurate and complete. We are not liable for packages lost due to incorrect or incomplete addresses. Please contact us quickly if you realize an error in your shipping information.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. Split Shipments</h2>
        <p>
          In some cases, your order may be fulfilled from multiple warehouses, resulting in multiple packages. You will receive separate tracking numbers for each package if applicable.
        </p>
      </section>

      <section className={styles.section}>
        <h2>9. International Customs & Duties</h2>
        <p>
          For international orders, customs and import duties may apply depending on your country. These fees are the responsibility of the recipient and are not included in the item or shipping costs. Adidas is not responsible for delays caused by customs clearance.
        </p>
      </section>

      <section className={styles.section}>
        <h2>10. Questions & Contact</h2>
        <p>
          For questions regarding shipping methods, timelines, or special delivery instructions, please reach out to our customer service team via the <strong>Contact Us</strong> page or:
          <br /><br />
          <strong>Email:</strong> shipping@adidas.com <br />
          <strong>Phone:</strong> +1 (800) 555-ADIDAS <br />
          <strong>Address:</strong> Adidas Fulfillment Center, 5055 N. Greeley Ave, Portland, OR 97217
        </p>
      </section>
    </div>
  );
};

export default ShippingPolicy;
