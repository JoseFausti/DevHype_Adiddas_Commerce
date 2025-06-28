
import styles from './Blog2.module.css';

const Blog2 = () => (
  <>
    {/* Full-width banner */}
    <div className={styles.banner}>
      <img
        src="https://res.cloudinary.com/dxiqjdiz6/image/upload/f_auto,q_auto/v1750970467/messi_y6aj1m.webp"
        alt="Adidas x Messi x Bad Bunny Banner"
      />
    </div>

    {/* Main blog container */}
    <div className={styles.blog__container}>
      <h2 className={styles.title}>ADIDAS ORIGINALS PRESENTS: THE BAD BUNNY & MESSI COLLECTION</h2>
      <div className={styles.content}>
        <p>
          Music and Soccer Stars Collaborate for the First Time; Bad Bunny & Messi Collection Drops October 26
        </p>
        <p>
          Today, adidas Originals announces a one-of-a-kind partnership between two global superstars, Benito Antonio Martinez Ocasio,
          better known as Bad Bunny, and soccer legend Lionel Messi. The Bad Bunny & Messi Collection celebrates the incredible
          connection between music and sport, two passions that unite fans across the world, and pays homage to their individual legacies.
        </p>
        <p>
          The collection draws inspiration from adidas heritage models, featuring the Gazelle and F50 cleat. Each piece honors Messi’s
          legacy with gold hues and X-stripe details, while also showcasing Bad Bunny’s signature style. Designs include both stars’
          signatures and cultural references that transcend sport.
        </p>
        <p>
          “Collaborating with him is an honor that so many people dream of and I never even imagined I could achieve it,” said Bad Bunny.
        </p>
        <p>
          “Music is connected to many aspects of my life, and Bad Bunny is an artist who is never missing from my playlist,” shared Messi.
        </p>
        <p>
          The campaign features a heartfelt short film built from fan messages across social platforms. This powerful message is brought
          to life in a film featuring Messi and Bad Bunny reading aloud to their fans.
        </p>
        <p>
          The collection will be available globally via CONFIRMED and adidas flagship stores starting October 26. Gazelle models
          exclusive to the Americas, F50s available worldwide.
        </p>
        <p className={styles.promo}>
          ✦ Sign up now on CONFIRMED app — <strong>limited release</strong> begins October 26!
        </p>
      </div>
    </div>
  </>
);

export default Blog2;
