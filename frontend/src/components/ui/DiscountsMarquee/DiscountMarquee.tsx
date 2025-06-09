import React from 'react';
import styles from './DiscountMarquee.module.css';

interface DiscountMarqueeProps {
  messages: string[];
}

const DiscountMarquee: React.FC<DiscountMarqueeProps> = ({ messages }) => {
  // Concatenamos los mensajes con un separador, por ejemplo, " — "
  const text = messages.join(' — ');
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeContent}>
        {text}
      </div>
    </div>
  );
};

export default DiscountMarquee;
