
import styles from './Blog1.module.css';

const Blog1 = () => (
  <>
    {/* Full-width banner */}
    <div className={styles.banner}>
      <img
        src="https://res.cloudinary.com/dxiqjdiz6/image/upload/f_auto,q_auto/v1750963958/Bascket_1_feamav.webp"
        alt="Adidas Basketball Banner"
      />
    </div>

    {/* Main blog container */}
    <div className={styles.blog__container}>
      <h2 className={styles.title}>ADIDAS BASKETBALL: Beyond the Game</h2>
      <div className={styles.content}>
        <p>
          adidas Basketball proudly welcomes the next wave of elite NIL student-athletes to its roster, reinforcing the brand’s commitment to empowering the future of the game. This Class of 2025 features a dynamic group of young stars who are not only top performers on the court, but also cultural leaders off of it.
        </p>
        <p>
          These athletes join adidas through a partnership designed to propel them to success on and off the court, building on the legacy of our 3SSB platform and the broader adidas Basketball ecosystem. Among the following group are previously announced adidas NIL partners Kaleena Smith and Adam Oumiddoch, who continue to blaze trails for the next generation.
        </p>
        <p>
          With iconic collaborations, groundbreaking footwear like the Harden Vol. 7 and Trae Young 3, and apparel
          built for comfort and agility, adidas continues to innovate for the modern athlete.
        </p>
        <p>
          Whether you're running drills, playing a pickup game, or watching courtside, adidas Basketball helps
          you stay sharp and stylish.
        </p>
        <ul>
          <li>
            <strong>Bruce Branch III</strong> is a 6-foot-5 small forward from Gilbert, Arizona, and a standout member of the Class of 2027. He plays for 3SSB’s Compton Magic and contributed to Perry’s Open Division state championship as a freshman. Branch is known for his length, athleticism, and ability to score at all three levels.
          </li>
          <li>
            <strong>Oliviyah Edwards</strong> is a 6-foot-3 power forward from Tacoma, Washington, and a five-star prospect in the Class of 2026. She plays for Elite Sports Academy and 3SSB’s Northwest Greyhounds. Edwards is known for her athleticism, versatility, and rare ability to dunk, earning her national recognition as one of the top 5 players in her class.
          </li>
          <li>
            <strong>Kate Harpring</strong> is a 5-foot-10 point guard from Marist School in Atlanta, Georgia, and a five-star recruit ranked No. 2 nationally in the Class of 2026 by ESPN. She plays for 3SSB’s Southeast All-Stars and led Marist to a Georgia Class 6A state championship, highlighted by a 45-point performance in the semifinals. Known for her three-level scoring, defensive tenacity, and leadership, Harpring is also the daughter of former NBA player Matt Harpring.
          </li>
          <li>
            <strong>Caleb Holt</strong> is a highly regarded 6-foot-5, 200-pound shooting guard from Loganville, Georgia. A five-star recruit in the Class of 2026, he is ranked as the No. 1 shooting guard and No. 3 overall prospect nationally. Holt plays for Grayson High School and 3SSB’s Game Elite. He is known for his aggressive downhill play, refined shooting skills, and international experience representing the United States.
          </li>
          <li>
            <strong>Taylen Kinney</strong> is a five-star point guard from Newport, Kentucky, ranked among the top 20 players nationally in the Class of 2026. He competes for RWE in the Overtime Elite league and 3SSB’s Wildcat Select. Kinney is known for his elite ball-handling and scoring prowess. Off the court, he has built a large following on TikTok, going viral with trends like his popular “6'7” content.
          </li>
          <li>
            <strong>Adam Oumiddoch</strong> is a 6-foot-5 shooting guard from Arlington, Virginia, and a top prospect in the Class of 2026. He plays for the Cold Hearts in Overtime Elite and 3SSB’s Wildcat Select. Known for his scoring ability and basketball IQ, Oumiddoch has represented Team USA at junior national camps and earned All-American honors as a freshman at Bishop O’Connell High School. His social media presence, particularly on TikTok, highlights his growing marketability off the court.
          </li>
          <li>
            <strong>Kaleena Smith</strong> is a 5-foot-6 point guard from Ontario Christian High School in California and the top-ranked girls' basketball recruit in the Class of 2027. She plays for 3SSB’s 7 Days and averaged an astonishing 34.9 points, 6.5 assists, 3.5 rebounds, and 4.2 steals per game as a sophomore. Smith earned honors such as MaxPreps National Sophomore of the Year and Los Angeles Times Girls’ Basketball Player of the Year and made history as the first high school girls’ basketball player to sign an NIL deal with adidas.
          </li>
          <li>
            <strong>Anthony Thompson</strong> is a 6-foot-8 small forward from Lebanon, Ohio, and one of the top recruits in the Class of 2026. He plays for Western Reserve Academy and 3SSB’s Indiana Elite. Thompson is known for his versatility, efficient scoring, and impressive physical tools, including a 7'3" wingspan. He also maintains a 3.85 GPA, reflecting his commitment both on the court and in the classroom.
          </li>
        </ul>
        <p>
          This new class of student athletes brings passion, innovation, and relentless drive to the court. As they enter the NIL era, adidas is proud to support their journeys as they shape the future of basketball.
        </p>
        <h2>
          <strong>About adidas</strong>
        </h2>
        <p>
          adidas is a global leader in the sporting goods industry. Headquartered in Herzogenaurach/Germany, the company employs more than 62,000 people across the globe and generated sales of €23.7 billion in 2024. For more information, please visit <a href='www.adidas-Group.com'>www.adidas-Group.com</a>.
        </p>
        <h2>
          <strong>adidas Basketball</strong>
        </h2>
        <p>

          IG: <a href='https://www.instagram.com/adidasbasketball/'>@adidasbasketball</a><a href='https://www.instagram.com/adidas?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>/ @adidas</a><br />

          X/Twitter: <a href='https://twitter.com/adidashoops'>@adidashoops</a><a href='https://www.instagram.com/adidas?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>/ @adidas</a>
        </p>
        <p className={styles.promo}>
          ✦ Discover our latest basketball collection — <strong>now with 25% off</strong> for a limited time!
        </p>
      </div>
    </div>
  </>
);

export default Blog1;
