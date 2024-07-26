import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import LoginForm from "@/components/forms/Login";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import React from "react";

const Login = () => {
  return (
    <Container>
      <div className="w-full h-full sm:min-h-screen flex justify-center items-center my-8">
        <div className="w-full max-w-[30rem]">
          <div className="flex justify-center items-center mb-12">
            <Logo />
          </div>

          <div className="sm:bg-white p-10 rounded-xl">
            <header className="mb-10">
              <h1 className="font-bold text-3xl">Login</h1>
              <p className="text-grey">
                Add your details below to get back into the app
              </p>
            </header>

            <LoginForm />

            <div className="flex justify-center items-center mt-6">
              <div className="flex flex-col md:flex-row justify-center items-center">
                <span className="text-grey whitespace-nowrap">
                  Don’t have an account?
                </span>
                <Link href="/register">
                  <Button variant="link" className="p-0 h-fit ml-1">
                    Create account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
