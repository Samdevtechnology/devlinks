import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Link from "next/link";
import ForgotPasswordForm from "@/components/forms/ForgotPassword";

const ForgotPassword = () => {
  return (
    <Container>
      <div className="w-full h-full sm:min-h-screen flex justify-center items-center my-8">
        <div className="w-full max-w-[30rem]">
          <div className="flex justify-center items-center mb-12 px-3 sm:px-10 ">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <div className="sm:bg-card p-3 sm:p-10 rounded-xl">
            <header className="mb-4 text-center sm:text-start">
              <h1 className="font-bold text-3xl">Forgot Password</h1>
              <p className="text-grey mt-2">
                Provide the Email Address for your account.
              </p>
            </header>

            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ForgotPassword;
