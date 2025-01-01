import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroImage from "../HeroImage";
import Container from "@/components/common/Container";

const Hero = () => {
  return (
    <section>
      <Container>
        <div className="flex justify-between items-center gap-8 sm:gap-0 sm:items-start flex-col sm:flex-row mb-12 mt-8">
          <div className="sm:w-3/5">
            <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold">
              Streamline Your Online Presence ~ Share Your Social Links in One
              Click.
            </h3>
            <p className="py-4 font-medium text-lg">
              Our goal is to empower developers by providing a streamlined
              platform to showcase their Identity. We aim to simplify the way
              developers connect with their audience, enabling them to share
              their professional brand effortlessly.
            </p>
            <Link href="/dashboard">
              <Button size="sm" className="w-fit">
                Get Started
              </Button>
            </Link>
          </div>
          <div className="flex justify-end">
            <HeroImage />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
