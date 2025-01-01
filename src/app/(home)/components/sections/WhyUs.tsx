import FeaturesCard from "./FeaturesCard";
import Container from "@/components/common/Container";

const WhyUs = () => {
  return (
    <section className="bg-primary-hover">
      <Container>
        <div className="pt-10 sm:pt-6 pb-14">
          <div className="flex flex-col justify-center items-center">
            <header className="text-3xl font-semibold">WHY CHOOSE US</header>
            <div className="text-xl max-w-lg text-center mt-2 mb-10">
              It’s a simple and efficient wallet for all your social media. Your
              portable link-in-bio tool.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 sm:flex-row gap-7">
            <FeaturesCard
              Icon="Wind"
              Title="Effortless Setup"
              Text="The app’s intuitive design makes it simple to set up your profile, add links, and share with your audience in just a few clicks."
            />
            <FeaturesCard
              Inverse
              Icon="Tool"
              Title="User-Friendly"
              Text="Designed with accessibility in mind, supporting both dark and light modes to ensure a smooth experience for all users."
            />
            <FeaturesCard
              Icon="Brush"
              Title="Express Yourself"
              Text="Own your profile by customizing it with your name or a nickname, adding your email, and uploading a profile picture for that personal touch."
            />
            <FeaturesCard
              Icon="QRCode"
              Title="Quick Share"
              Text="Instantly generate a QR code for your link and share it in print or online. Provide a quick, scannable way for people to connect to all your social profiles."
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyUs;
