import styles from './Blog4.module.css';

const Blog4 = () => (
  <>
    {/* Full-width banner */}
    <div className={styles.banner}>
      <img
        src="https://res.cloudinary.com/dxiqjdiz6/image/upload/f_auto,q_auto/v1750971926/690041_hbrvrn.webp"
        alt="adidas TERREX Skychaser Banner"
      />
    </div>

    {/* Main blog container */}
    <div className={styles.blog__container}>
      <h2 className={styles.title}>adidas TERREX: Skychaser GORE-TEX Redefines Outdoor Versatility</h2>
      <div className={styles.content}>
        <p>
          Fusing a fresh silhouette with celebrated technologies, the <strong>Skychaser GORE-TEX</strong> is built to deliver performance and style from technical terrain to everyday adventures.
        </p>
        <p>
          Features including a GORE-TEX upper, LIGHTSTRIKE midsole, and a Continental™ rubber outsole provide trail-tested protection, control, and comfort for all types of hikes.
        </p>
        <p>
          Available to purchase from <strong>March 3rd, 2025</strong> on the adidas app, via <a href="https://www.adidas.com/us/hiking-shoes">adidas.com/hiking-shoes</a> and select retail stores.
        </p>
        <p>
          Today, adidas TERREX introduces a new chapter in its hiking footwear range with the unveil of the redesigned Skychaser GORE-TEX, which unites trail-tested technologies with a modern design – built for today’s versatile adventurers.
        </p>
        <p>
          <em>Carla Murphy, SVP/Global General Manager, adidas TERREX</em> said: “Multi-functional footwear is a necessity in our increasingly versatile outdoor lives. The evolution of the Skychaser was designed with this in mind, technically designed to enable adventurers to explore the great outdoors and equally adaptable to a city life on the go. The Skychaser GORE-TEX focuses on comfort and protection and brings a new aesthetic to an established classic, merging the old with the new. With this silhouette, we hope to inspire outdoor seekers to experience the transformative powers of nature in style, no matter their adventure.”
        </p>
        <p>
          Drawing on adidas' rich heritage in outdoor exploration, the Skychaser GORE-TEX has been engineered with insights from mountain guides in the Alps. The footwear is inspired by the design ethos of classic adidas hiking models and features trail-tested technologies designed to enable a better outdoor experience including:
        </p>
        <ul>
          <li>
            <strong>LIGHTSTRIKE midsole:</strong> Engineered to provide hikers with all-day comfort underfoot, no matter the adventure.
          </li>
          <li>
            <strong>GORE-TEX upper:</strong> For protection from the elements, repelling rain and keeping the adventurer’s feet dry. This is complimented by a molded toe cap which prevents damage from sharp objects out on the trail or in the city.
          </li>
          <li>
            <strong>Stability Plate:</strong> Placed between the upper and midsole, the stability plate acts as a stiffening element, designed to provide a more stable feeling for hikers in technical terrain.
          </li>
          <li>
            <strong>Continental™ outsole:</strong> Designed with 5mm lugs, the reformulated Continental™ outsole provides optimal traction in all conditions.
          </li>
        </ul>
        <p>
          Completing the full head-to-toe look are three new apparel pieces:
        </p>
        <ul>
          <li>
            The light and packable <strong>adidas TERREX Xploric Anorak Jacket</strong> features CLIMAPROOF technology for protection from the elements alongside a backpack-friendly front pocket construction with two side zippers for easy access to belongings.
          </li>
          <li>
            The <strong>adidas TERREX Xploric Cargo Pants</strong> boast a UPF 50+ material to protect skin against the sun for those long days out on the trails.
          </li>
          <li>
            The <strong>adidas TERREX Utilitas Zip Off Pant</strong> is built for convenience, with two zippers on the lower legs which make it easy to take shoes on and off.
          </li>
        </ul>
        <p>
          The Skychaser GORE-TEX will be available in a <strong>core black / grey one</strong> colorway for men and a <strong>core black / off white / grey one</strong> colorway for women from <strong>March 3rd, 2025</strong> for €160 / $160 online at <a href="https://www.adidas.com/us/hiking-shoes">adidas.com/hiking-shoes</a>, on the adidas app and in select retail stores.
        </p>
        <h2>
          <strong>adidas TERREX</strong>
        </h2>
        <p>
          Follow us on Instagram: <a href="https://www.instagram.com/adidasterrex/">@adidasterrex</a><br />
          Discover more at <a href="https://www.adidas.com/us/hiking-shoes">adidas.com/us/hiking-shoes</a>
        </p>
        <p className={styles.promo}>
          ✦ Explore the outdoors in style — <strong>Skychaser GORE-TEX available now</strong>!
        </p>
      </div>
    </div>
  </>
);

export default Blog4;
