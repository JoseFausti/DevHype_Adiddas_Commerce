import { JSX } from "react";

interface Props {
    title: string,
    element: JSX.Element
}

const AboutInfo = ({ element }: Props) => (
  <div style={{ marginTop: "2rem" }}>
    {element}
  </div>
);

export default AboutInfo
