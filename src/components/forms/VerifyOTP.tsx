"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import genOTP from "@/actions/genOTP";
import verifyOTP from "@/actions/verifyOTP";

const verifyOTPSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

const VerifyOTP = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [msg, setMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = useState<number>(60);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);

  const form = useForm<z.infer<typeof verifyOTPSchema>>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      setIsResendDisabled(true);
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleSubmit = async ({ otp }: z.infer<typeof verifyOTPSchema>) => {
    try {
      const email = sessionStorage.getItem("reset_email") || "";

      if (!email) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No reset email found",
        });
        return router.push("/forgot-password");
      }

      setIsLoading(true);
      setMsg("");

      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", otp);
      const response = await verifyOTP(formData);

      if (response.success) {
        toast({
          description: response.message,
        });
        router.push(`/reset-password?token=${response.resetToken}`);
      } else {
        setMsg(response.message);
      }
    } catch (err) {
      setMsg("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendCooldown(60); // Reset cooldown
      setIsResendDisabled(true);

      const email = localStorage.getItem("otpEmail") || "";

      if (!email) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No reset email found",
        });
        return router.push("/forgot-password");
      }

      const formData = new FormData();
      formData.append("email", email);
      const response = await genOTP(formData);

      if (response.success) {
        toast({
          title: "OTP Sent",
          description: "A new OTP has been sent to your email.",
        });
      } else {
        setMsg(response.message);
      }
    } catch (err) {
      setMsg("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="mb-4">
      {msg && (
        <div className="text-sm text-center text-destructive p-2 bg-red-50 dark:bg-red-950/50 mb-4 font-semibold rounded-md">
          {msg}
        </div>
      )}
      <Form {...form}>
        <form
          className="flex flex-col justify-center font-semibold items-center"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={4} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex justify-between items-center w-full p-4 rounded-sm bg-secondary mt-6">
            <div>Didn’t get the code?</div>
            {isResendDisabled ? (
              <p>
                Resend in{" "}
                <span className="text-primary">{resendCooldown}s</span>
              </p>
            ) : (
              <Button
                variant="link"
                className="w-fit h-fit text-base p-0 font-bold"
                onClick={handleResendOtp}
              >
                Resend
              </Button>
            )}
          </div>
          <Button className="mt-6 text-base" type="submit">
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VerifyOTP;
