import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Link from "next/link";
import VerifyOTPForm from "@/components/forms/VerifyOTP";

const VerifyOtp = () => {
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
              <h1 className="font-bold text-3xl">One-Time Password</h1>
              <p className="text-grey mt-2">
                Please enter the OTP sent to your mail.
              </p>
            </header>

            <VerifyOTPForm />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VerifyOtp;
