import styles from './ShippingReturns.module.css';

const ShippingReturns = () => {
  return (
    <div className={styles.container}>
      <h1>Shipping & Returns</h1>

      <section className={styles.section}>
        <p>
          At Adidas, your satisfaction is our top priority. We offer a transparent, easy-to-follow shipping and return process to ensure you have a positive shopping experience. Please read the details below carefully to understand our policies.
        </p>
      </section>

      <section className={styles.section}>
        <h2>1. Return Eligibility</h2>
        <p>
          Items must be returned within <strong>30 days</strong> of the delivery date to be eligible for a refund or exchange. Returned products must be:
        </p>
        <ul>
          <li>Unused and unwashed</li>
          <li>In their original packaging</li>
          <li>With all tags, labels, and accessories attached</li>
        </ul>
        <p>
          Returns that do not meet these criteria may be refused or subject to partial refund.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. How to Initiate a Return</h2>
        <ol>
          <li>Log into your Adidas account and navigate to your order history.</li>
          <li>Select the item(s) you wish to return and click “Request Return.”</li>
          <li>Print the prepaid return shipping label provided.</li>
          <li>Pack the item securely with the return label attached.</li>
          <li>Drop the package off at your nearest authorized shipping center or arrange a pickup if available.</li>
        </ol>
        <p>
          If you don’t have an Adidas account, contact customer support for assistance with returns.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Refund Policy</h2>
        <p>
          After we receive and inspect your returned items, refunds will be processed to your original payment method. The refund timeline is:
        </p>
        <ul>
          <li>7–10 business days for credit/debit card payments</li>
          <li>3–5 business days for PayPal refunds</li>
          <li>Additional time may be required by your bank or payment provider</li>
        </ul>
        <p>
          You will receive an email confirmation once your refund has been processed.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Non-Returnable Items</h2>
        <p>
          The following products are <strong>not eligible</strong> for returns or refunds:
        </p>
        <ul>
          <li>Customized or personalized products</li>
          <li>Gift cards and promotional codes</li>
          <li>Items marked as “Final Sale” or clearance</li>
          <li>Hygiene products such as socks or earphones once opened</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>5. Shipping Times & Costs for Returns</h2>
        <p>
          Return shipping costs are typically the responsibility of the customer unless the return is due to a defect or Adidas error. Shipping time for returns varies depending on your location and carrier.
        </p>
        <p>
          We recommend using a tracked shipping method to ensure your return package arrives safely.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Exchanges</h2>
        <p>
          Exchanges for size or color are handled as a return followed by a new purchase. Please follow the return instructions above and place a new order for the desired item.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Damaged or Incorrect Items</h2>
        <p>
          If you receive a damaged or incorrect item, please contact Adidas customer support within 7 days of delivery. We will arrange for a replacement or refund at no extra cost to you.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. Contact Information</h2>
        <p>
          For any questions or concerns about shipping and returns, contact our support team through the <strong>Contact Us</strong> page or:
          <br /><br />
          <strong>Email:</strong> returns@adidas.com <br />
          <strong>Phone:</strong> +1 (800) 555-ADIDAS <br />
          <strong>Address:</strong> Adidas Returns Department, 5055 N. Greeley Ave, Portland, OR 97217
        </p>
      </section>
    </div>
  );
};

export default ShippingReturns;
