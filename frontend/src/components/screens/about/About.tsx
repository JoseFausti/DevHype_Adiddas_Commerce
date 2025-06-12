import { useSearchParams } from "react-router-dom";
import AboutInfo from "../../ui/about/AboutInfo";
<<<<<<< HEAD
import { JSX } from "react";
import AboutUs from "../../ui/about/Footer Descriptions/AboutUs/AboutUs";
import PrivacyPolicy from "../../ui/about/Footer Descriptions/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../../ui/about/Footer Descriptions/TermsOfService/TermsOfService";
import ShippingPolicy from "../../ui/about/Footer Descriptions/ShippingPolicy/ShippingPolicy";
import Faq from "../../ui/about/Footer Descriptions/FAQ/Faq";
import ShippingReturns from "../../ui/about/Footer Descriptions/ShippingReturns/ShippingReturns";
import OrderTracking from "../../ui/about/Footer Descriptions/OrderTracking/OrderTracking";
import SizeGuide from "../../ui/about/Footer Descriptions/SizeGuide/SizeGuide";
import ContactUs from "../../ui/about/Footer Descriptions/ContactUs/ContactUs";

=======
import AboutUs from "../../ui/about/info/AboutUs/AboutUs";
import PrivacyPolicy from "../../ui/about/info/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../../ui/about/info/TermsOfService/TermsOfService";
import ShippingPolicy from "../../ui/about/info/ShippingPolicy/ShippingPolicy";
import ShippingReturns from "../../ui/about/info/ShippingReturns/ShippingReturns";
import OrderTracking from "../../ui/about/info/OrderTracking/OrderTracking";
import SizeGuide from "../../ui/about/info/SizeGuide/SizeGuide";
import ContactUs from "../../ui/about/info/ContactUs/ContactUs";
import Faq from "../../ui/about/info/FAQ/Faq";
>>>>>>> origin

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

<<<<<<< HEAD
    const element: JSX.Element = q! &&
        q === "about" ? <AboutUs /> 
        : q === "privacy" ? <PrivacyPolicy /> 
        : q === "terms" ? <TermsOfService />
        : q === "shipping" ? <ShippingPolicy /> 
        : q === "faq" ? <Faq />
        : q === "shipping-returns" ? <ShippingReturns />
        : q === "tracking" ? <OrderTracking />
        : q === "size-guide" ? <SizeGuide />
        : q === "contact" && <ContactUs />;
=======
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
>>>>>>> origin

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
