import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Link from "next/link";
import ResetPasswordForm from "@/components/forms/ResetPassword";

const ResetPassword = () => {
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
            <header className="mb-10 text-center sm:text-start">
              <h1 className="font-bold text-3xl">Reset Password</h1>
              <p className="text-grey mt-2">
                Please provide a new password for your account.
              </p>
            </header>

            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ResetPassword;
