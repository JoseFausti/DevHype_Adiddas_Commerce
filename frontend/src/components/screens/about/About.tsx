import { useSearchParams } from "react-router-dom";
import AboutInfo from "../../ui/about/AboutInfo";
import AboutUs from "../../ui/about/info/AboutUs/AboutUs";
import PrivacyPolicy from "../../ui/about/info/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../../ui/about/info/TermsOfService/TermsOfService";
import ShippingPolicy from "../../ui/about/info/ShippingPolicy/ShippingPolicy";
import ShippingReturns from "../../ui/about/info/ShippingReturns/ShippingReturns";
import OrderTracking from "../../ui/about/info/OrderTracking/OrderTracking";
import SizeGuide from "../../ui/about/info/SizeGuide/SizeGuide";
import ContactUs from "../../ui/about/info/ContactUs/ContactUs";
import Faq from "../../ui/about/info/FAQ/Faq";

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

  const element = q! &&
      q === "about" ? <AboutUs /> 
      : q === "privacy" ? <PrivacyPolicy /> 
      : q === "terms" ? <TermsOfService />
      : q === "shipping" ? <ShippingPolicy /> 
      : q === "faq" ? <Faq />
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
