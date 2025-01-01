import Container from "@/components/common/Container";

const Hng = () => {
  return (
    <section>
      <Container>
        <div className="flex flex-col sm:flex-row pb-10">
          <div className="sm:w-1/2 py-24 sm:py-0 p-8 rounded-t-xl sm:rounded-tr-none sm:rounded-s-xl text-white font-bold text-6xl sm:text-7xl flex justify-center items-center bg-[radial-gradient(112.28%_106.58%_at_50%_50%,_#00AEFF_0%,_rgba(255,255,255,0.8)_100%)]">
            [ ] HNG 11
          </div>
          <div className="sm:w-1/2 p-2 py-8 sm:p-8 rounded-b-xl sm:rounded-bl-none sm:rounded-e-xl bg-[#D7EDF3] dark:text-background">
            <h5 className="font-bold text-2xl text-center">
              Devlinks is an HNG 11 internship task.
            </h5>
            <p className="font-medium text-lg pl-8 pt-2 sm:pt-0">
              I chose to add some additional features to mine. Added features
              including
            </p>
            <ul className="list-disc font-medium pl-8 text-xl ml-4 flex flex-col-reverse sm:flex-row justify-between mt-4">
              <div>
                <li>Dark mode</li>
                <li>Multiple Login Options</li>
              </div>
              <div>
                <li>QR Code</li>
              </div>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hng;
