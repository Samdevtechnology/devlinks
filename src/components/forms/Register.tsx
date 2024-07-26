"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/stores/firebase/config";
import { FirebaseError } from "firebase/app";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    email: z.string().min(1, "Can’t be empty").email(),
    password: z.string().min(8, "Please check length"),
    passwordConfirm: z.string().min(1, "Can’t be empty"),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "passwords mismatch",
      path: ["passwordConfirm"],
    }
  );

const Register = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      toast({
        title: "Registration Successful",
        description: "You've been successfully registered",
      });
      router.push("/login");
    } catch (err) {
      if (err instanceof FirebaseError) {
        const errMsg = err.code;
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: errMsg,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Something went wrong with authentication",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Create password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="At least 8 characters"
                    type="password"
                    {...field}
                    errorMsg={form.formState.errors.password?.message}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="At least 8 characters"
                    type="password"
                    {...field}
                    errorMsg={form.formState.errors.passwordConfirm?.message}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <p className=" text-xs text-grey">
          Password must contain at least 8 characters
        </p>
        <Button type="submit">Create new account</Button>
      </form>
    </Form>
  );
};

export default Register;
