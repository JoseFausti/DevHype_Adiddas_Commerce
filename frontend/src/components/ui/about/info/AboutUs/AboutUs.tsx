import styles from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <h1>About Adidas</h1>

      <section className={styles.section}>
        <h2>Our Mission</h2>
        <p>
          At Adidas, we believe that through sport, we have the power to change lives. Since 1949, we’ve been creating products that combine performance, style, and innovation to support athletes of all levels — from beginners to champions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Innovation & Performance</h2>
        <p>
          We push boundaries by developing cutting-edge technologies like BOOST, PRIMEKNIT, and Futurecraft. Our footwear and apparel are designed to help you go further, faster, and stronger—on the field, the court, or the street.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Style Meets Function</h2>
        <p>
          Our collections are not only performance-driven but fashion-forward. Collaborations with creators like Kanye West, Beyoncé, and Pharrell Williams blend streetwear with sport, bringing iconic looks to your everyday life.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Commitment to Sustainability</h2>
        <p>
          Adidas is leading the way in sustainable design. We use recycled materials like Parley Ocean Plastic and aim to achieve climate neutrality by 2050. Every step we take is part of our promise to protect the planet.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Global Impact</h2>
        <p>
          With a presence in over 160 countries and a community of millions, Adidas isn't just a brand — it's a global movement. We empower people through sport, culture, and creativity, making sure everyone has a place to belong.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;

