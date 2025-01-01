import Container from "@/components/common/Container";
import FlipCard from "../FlipCard";

const BuiltWithDev = () => {
  return (
    <section>
      <Container>
        <div className="flex flex-col-reverse sm:flex-row py-4">
          <div className="sm:w-1/3 flex justify-center items-center">
            <FlipCard />
          </div>
          <div className="sm:w-2/3 pt-8 text-center sm:text-left">
            <h5 className="font-semibold text-3xl">Built With DEVS In Mind</h5>
            <p className="py-4 font-medium text-lg">
              Easily share your Devlink URL with friends both online and
              offline, you can easily share your QR code offline. We currently
              have over 20 social platforms available specifically selected for
              Devs and actively adding more.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BuiltWithDev;
