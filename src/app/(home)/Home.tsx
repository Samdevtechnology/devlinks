import Header from "./components/Header";
import WhyUs from "./components/sections/WhyUs";
import Hero from "./components/sections/Hero";
import BuiltWithDev from "./components/sections/BuiltWithDev";
import OurMission from "./components/sections/OurMission";
import Hng from "./components/sections/Hng";
import Newsletter from "./components/sections/Newsletter";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <WhyUs />
      <BuiltWithDev />
      <OurMission />
      <Hng />
      <Newsletter />
      <Footer />
    </>
  );
}
