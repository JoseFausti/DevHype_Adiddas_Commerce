import { JSX } from "react";
import styles from "./BlogLayout.module.css";

interface Props {
  title: string;
  element: JSX.Element;
}

const BlogLayout = ({ element }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{element}</div>
    </div>
  );
};

export default BlogLayout;
