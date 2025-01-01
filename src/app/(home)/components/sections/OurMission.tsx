import Container from "@/components/common/Container";
import { Logo } from "@/components/icons/Icons";
import SocialGroup from "@/components/icons/SocialGroup";
import { cn } from "@/lib/utils";

const Dot = ({ className }: { className: string }) => {
  return (
    <div
      className={cn(
        `w-3 h-3 rounded-full bg-primary-hover absolute`,
        className
      )}
    />
  );
};

const OurMission = () => {
  return (
    <Container>
      <section>
        <div className="flex flex-col sm:flex-row gap-4 pb-10">
          <div className="sm:w-1/2 relative bg-primary rounded-lg p-16 text-center">
            <Dot className="top-6 left-6" />
            <Dot className="bottom-6 left-6" />
            <Dot className="top-6 right-6" />
            <Dot className="bottom-6 right-6" />
            <h5 className="bg-white dark:text-background rounded-3xl font-semibold text-2xl p-3">
              Our Mission
            </h5>
            <p className="font-semibold text-white text-2xl mt-8">
              Simplifying Social <br />
              Connections for Devs
            </p>
          </div>
          <div className="sm:w-1/2 mt-4 sm:mt-0 bg-primary-hover rounded-lg p-8 flex justify-center items-center relative">
            <div className="border-[3px] absolute border-primary rounded-full p-2">
              <Logo size={48} />
            </div>
            <SocialGroup />
          </div>
        </div>
      </section>
    </Container>
  );
};

export default OurMission;
