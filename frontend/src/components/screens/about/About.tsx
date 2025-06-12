import { useSearchParams } from "react-router-dom";
import AboutInfo from "../../ui/about/AboutInfo";
import { JSX } from "react";

const About = () => {

    const  [searchParams] = useSearchParams();
    const q = searchParams.get("q");
    
    const title = q! &&
        q === "about" ? "About Us" 
        : q === "privacy" ? "Privacy Policy" 
        : q === "terms" ? "Terms of Service" 
        : q === "shipping" ? "Shipping Policy" 
        : q === "faq" ? "FAQ"
        : q === "shipping-returns" ? "Shipping & Returns"
        : q === "tracking" ? "Order Tracking"
        : q === "size-guide" ? "Size Guide"
        : q === "contact" && "Contact Us";

    const element: JSX.Element = q! &&
        q === "about" ? <AboutUs /> 
        : q === "privacy" ? <PrivacyPolicy /> 
        : q === "terms" ? <TermsOfService />
        : q === "shipping" ? <ShippingPolicy /> 
        : q === "faq" ? <FAQ />
        : q === "shipping-returns" ? <ShippingReturns />
        : q === "tracking" ? <OrderTracking />
        : q === "size-guide" ? <SizeGuide />
        : q === "contact" && <ContactUs />;

    if (!title || !element) {
        return (
            <>
                <h1>404</h1>
                <h2>Page not found</h2>
            </>
        )
    }

  return (
    <>
      <AboutInfo title={title} element={element} />
    </>
  )
}

export default About
