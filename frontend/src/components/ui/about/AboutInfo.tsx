import { JSX } from "react";

interface Props {
    title: string,
    element: JSX.Element
}

const AboutInfo = ({ title, element }: Props) => (
  <div style={{ marginTop: "2rem" }}>
    <h2>{title}</h2>
    {element}
  </div>
);

export default AboutInfo
