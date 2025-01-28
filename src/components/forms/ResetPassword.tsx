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
import resetPassword from "@/actions/resetPassword";
import LoadingDots from "../common/LoadingDots";

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Please check length"),
    confirmPassword: z.string().min(1, "Can’t be empty"),
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmPassword;
    },
    {
      message: "passwords mismatch",
      path: ["confirmPassword"],
    }
  );

const ResetPassword = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [msg, setMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async ({
    newPassword,
  }: z.infer<typeof resetPasswordSchema>) => {
    try {
      const email = sessionStorage.getItem("reset_email") || "";
      const token = sessionStorage.getItem("token");

      if (!email) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No reset email found",
        });
        return router.push("/forgot-password");
      }

      if (!token) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No reset token found",
        });
        return router.push("/forgot-password");
      }

      setIsLoading(true);
      setMsg("");

      const formData = new FormData();
      formData.append("email", email);
      formData.append("token", token);
      formData.append("password", newPassword);
      const response = await resetPassword(formData);

      if (response.success) {
        toast({
          description: response.message,
        });
        router.push("/login");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("reset_email");
      } else {
        setMsg(response.message);
      }
    } catch (err) {
      setMsg("Failed to reset user password. Please try again.");
    } finally {
      setIsLoading(false);
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
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="mb-6">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-white h-12 dark:text-background"
                        placeholder="New Password"
                        type="newPassword"
                        {...field}
                        errorMsg={form.formState.errors.newPassword?.message}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <p className=" text-xs text-grey">
              Password must contain at least 8 characters
            </p>
          </div>
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-white h-12 dark:text-background"
                      placeholder="Confirm New Password"
                      type="confirmPassword"
                      {...field}
                      errorMsg={form.formState.errors.confirmPassword?.message}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Button className="mt-8 text-base" type="submit" disabled={isLoading}>
            {isLoading ? <LoadingDots /> : "Set Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;
