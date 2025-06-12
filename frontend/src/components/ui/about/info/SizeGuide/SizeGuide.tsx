import styles from './SizeGuide.module.css';

const SizeGuide = () => {
  return (
    <div className={styles.container}>
      <h1>Size Guide</h1>
      <p>
        Find your perfect fit with our comprehensive size guide. Please note that sizes may vary slightly between styles.
      </p>

      <h2>Men's Shoe Size</h2>
      <table className={styles.sizeTable}>
        <thead>
          <tr>
            <th>US</th>
            <th>UK</th>
            <th>EU</th>
            <th>CM</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>6</td><td>5.5</td><td>39</td><td>24.5</td></tr>
          <tr><td>7</td><td>6.5</td><td>40</td><td>25.5</td></tr>
          <tr><td>8</td><td>7.5</td><td>41 1/3</td><td>26.5</td></tr>
          <tr><td>9</td><td>8.5</td><td>42 2/3</td><td>27.5</td></tr>
          <tr><td>10</td><td>9.5</td><td>44</td><td>28.5</td></tr>
          <tr><td>11</td><td>10.5</td><td>45 1/3</td><td>29.5</td></tr>
          <tr><td>12</td><td>11.5</td><td>46 2/3</td><td>30.5</td></tr>
        </tbody>
      </table>

      <h2>Women's Shoe Size</h2>
      <table className={styles.sizeTable}>
        <thead>
          <tr>
            <th>US</th>
            <th>UK</th>
            <th>EU</th>
            <th>CM</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>5</td><td>2.5</td><td>35 1/3</td><td>22</td></tr>
          <tr><td>6</td><td>3.5</td><td>36 2/3</td><td>23</td></tr>
          <tr><td>7</td><td>4.5</td><td>38</td><td>24</td></tr>
          <tr><td>8</td><td>5.5</td><td>39 1/3</td><td>25</td></tr>
          <tr><td>9</td><td>6.5</td><td>40 2/3</td><td>26</td></tr>
          <tr><td>10</td><td>7.5</td><td>42</td><td>27</td></tr>
        </tbody>
      </table>

      <h2>How to Measure</h2>
      <p>
        To measure your foot size accurately:
      </p>
      <ol>
        <li>Place a piece of paper on a flat surface against a wall.</li>
        <li>Stand on the paper with your heel touching the wall.</li>
        <li>Mark the longest toe on the paper.</li>
        <li>Measure the distance from the wall to the mark in centimeters.</li>
        <li>Use the table above to find your size.</li>
      </ol>
    </div>
  );
};

export default SizeGuide;
