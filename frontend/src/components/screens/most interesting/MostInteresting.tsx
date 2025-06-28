import { useSearchParams } from "react-router-dom";
import BlogLayout from "../../ui/most interesting/BlogLayout";
import Blog1 from "../../ui/most interesting/info/Blog1/Blog1";
import Blog2 from "../../ui/most interesting/info/Blog2/Blog2";
import Blog3 from "../../ui/most interesting/info/Blog3/Blog3";
import Blog4 from "../../ui/most interesting/info/Blog4/Blog4";


const MostInteresting = () => {

  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  const title = q! &&
    q === "blog1" ? "Blog 1"
    : q === "blog2" ? "Blog 2"
      : q === "blog3" ? "Blog 3"
        : q === "blog4" ? "Blog 4"
          : null;

  const element = q! &&
    q === "blog1" ? <Blog1 />
    : q === "blog2" ? <Blog2 />
      : q === "blog3" ? <Blog3 />
        : q === "blog4" ? <Blog4 />
          : null;

  if (!title || !element) {
    return (
      <>
        <h1>404</h1>
        <h2>Blog no encontrado</h2>
      </>
    );
  }

  return <BlogLayout title={title} element={element} />;
};

export default MostInteresting;
