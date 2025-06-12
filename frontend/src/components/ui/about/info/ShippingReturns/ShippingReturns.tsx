import styles from './ShippingReturns.module.css';

const ShippingReturns = () => {
  return (
    <div className={styles.container}>
      <h1>Shipping & Returns</h1>
      <p>
        At Adidas, your satisfaction is our priority. If you're not completely happy with your order, we offer a simple return and refund process.
      </p>

      <h2>Return Eligibility</h2>
      <p>
        Items must be returned within <strong>30 days</strong> of the delivery date. Products must be unused, unwashed, and in their original packaging with all tags attached.
      </p>

      <h2>How to Return</h2>
      <ol>
        <li>Log into your Adidas account and go to your order history.</li>
        <li>Select the item you wish to return and click “Request Return”.</li>
        <li>Print the return label and attach it to the package.</li>
        <li>Drop it off at your nearest shipping center or schedule a pickup.</li>
      </ol>

      <h2>Refund Policy</h2>
      <p>
        Once your return is received and inspected, we will issue a refund to your original payment method. This may take up to 7–10 business days depending on your bank.
      </p>

      <h2>Non-Returnable Items</h2>
      <p>
        Customized products, gift cards, and items marked as final sale cannot be returned.
      </p>
    </div>
  );
};

export default ShippingReturns;
