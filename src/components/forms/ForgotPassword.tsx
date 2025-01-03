"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useState } from "react";
import genOTP from "@/actions/genOTP";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email can’t be empty").email(),
});

const ForgotPassword = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [msg, setMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async ({
    email,
  }: z.infer<typeof forgotPasswordSchema>) => {
    try {
      setIsLoading(true);
      setMsg("");

      const formData = new FormData();
      formData.append("email", email);

      const response = await genOTP(formData);

      if (response.success) {
        sessionStorage.setItem("reset_email", email);
        toast({
          description: response.message,
        });
        router.push("/verify-otp");
      } else {
        setMsg(response.message);
      }
    } catch (err) {
      setMsg("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`mb-4 ${msg ? "" : "pt-6"}`}>
      {msg && (
        <div className="text-sm text-center text-destructive p-2 bg-red-50 dark:bg-red-950/50 mb-4 font-semibold rounded-md">
          {msg}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-white h-12 dark:text-background"
                      placeholder="e.g. alex@email.com"
                      type="email"
                      {...field}
                      errorMsg={form.formState.errors.email?.message}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Button className="mt-8 text-base" disabled={isLoading} type="submit">
            {isLoading ? "Sending OTP..." : "Request OTP"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;
