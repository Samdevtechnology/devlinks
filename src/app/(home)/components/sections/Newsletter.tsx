import Container from "@/components/common/Container";
import NewsletterForm from "@/components/forms/Newsletter";

const Newsletter = () => {
  return (
    <section>
      <Container>
        <div className="flex flex-col rounded-xl text-center p-8 bg-primary-hover justify-center items-center mb-8">
          <div className="max-w-96">
            <p className="font-medium sm:text-2xl pb-8">
              Subscribe To Our &nbsp;
              <span className="text-white font-bold dark:text-background">
                Newsletter
              </span>
              &nbsp; & Stay Up To Date
            </p>
            <NewsletterForm />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
