
import styles from './Blog3.module.css';

const Blog3 = () => (
  <>
    {/* Full-width banner */}
    <div className={styles.banner}>
      <img
        src="https://res.cloudinary.com/dxiqjdiz6/image/upload/f_auto,q_auto/v1750970834/692059_fvd4sr.webp"
        alt="Adidas x Brain Dead Banner"
      />
    </div>

    {/* Main blog container */}
    <div className={styles.blog__container}>
      <h2 className={styles.title}>ADIDAS ORIGINALS x BRAIN DEAD: FOREST HILLS REIMAGINED</h2>
      <div className={styles.content}>
        <p>
          Last year, adidas Originals and Brain Dead came together to debut a collaborative take on the iconic Stan Smith sneaker. 
          This season, the Los Angeles-based brand returns with a Spring/Summer 2025 collection that brings a fresh perspective to 
          the legacy of the adidas Forest Hills.
        </p>
        <p>
          Rather than leaning on the traditional aesthetics tied to the sport of tennis, the collection challenges the conventional 
          look and feel typically associated with country club tennis culture.
        </p>
        <p>
          Originally launched in 1976, the adidas Forest Hills was engineered to be the lightest tennis shoe of its time. Weighing just 
          8.7 ounces and featuring a ventilation system inspired by aerospace engineering, the silhouette became a hallmark of performance 
          and innovation — later finding its way into global style movement.
        </p>
        <p>
          Now, Brain Dead and adidas Originals offer a new expression of the court classic. Featuring a hairy suede upper, leather stripes, 
          and co-branded accents, each pair reimagines the heritage design in bold, two-tone colorways grounded in earth tones with 
          contrasting details.
        </p>
        <p>
          The apparel collection follows suit, reframing tennis style through Brain Dead’s offbeat lens. Merging sport and artistic energy, 
          the lineup includes hand-drawn graphics across track tops, crewnecks, and t-shirts, while polos, shorts, and track pants play with 
          classic silhouettes and natural tones to deliver something both wearable and unexpected.
        </p>
        <p>
          Releasing in limited quantities on April 25th, the adidas Originals x Brain Dead SS25 collection will be available via CONFIRMED, 
          select adidas stores, select retailers, and at wearebraindead.com.
        </p>

        <h2><strong>ABOUT BRAIN DEAD</strong></h2>
        <p>
          Brain Dead is a creative studio with deep ties to the fringe. It is a global collective of artists, designers, musicians, 
          filmmakers, and general creatives. Brain Dead is not one person, nor is it one idea. It sits in the space between people, 
          culture, entertainment and product.
        </p>
        <p>
          The initial ideas for Brain Dead were conceived in 2015 where CEO and Creative Director, Kyle Ng, quickly recognized a hole in 
          the contemporary apparel market for presenting the culture he cared for in a purposeful way. The culture-first fashion landscape 
          had become unbalanced—overly masculine in tone, derivative in high fashion, and overwhelmed by fast fashion with little substance 
          or intentionality.
        </p>
        <p>
          To create an impactful brand that truly represented Kyle’s interests meant creating apparel that was secondary to the culture that 
          informed it. In most instances that meant building the surrounding culture first; from the campaigns surrounding the product, events 
          coordinated for launches, and graphical references chosen, everything needed to speak to the intersection of a hodgepodge of sub-culture 
          in art, music, literature, sport, and cinema that became foundationally “Brain Dead”.
        </p>
        <p>
          Brain Dead is at its best an occupation of a space one step inside the fringe of subculture; a willingness to share the cultural 
          nonconformist input with a broader audience and stand proudly for it.
        </p>
        <p className={styles.promo}>
          ✦ Available now in limited quantities — only at select adidas stores and online.
        </p>
      </div>
    </div>
  </>
);

export default Blog3;
