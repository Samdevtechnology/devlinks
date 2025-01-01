"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { auth } from "@/stores/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import useUserStore from "@/stores/userStore";
import { useLinkStore } from "@/stores/linkStore";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().min(1, "Can’t be empty").email(),
  password: z.string().min(1, "Please check again"),
});

const Login = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { getUserFromDb } = useUserStore();
  const { getLinksFromDb } = useLinkStore();
  const { updateUser, saveUserToDb } = useUserStore();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = res.user;

      const returnPath = sessionStorage.getItem("returnPath");
      if (returnPath) {
        updateUser({ uid: user?.uid });

        saveUserToDb();

        sessionStorage.removeItem("returnPath");
        return router.push(returnPath);
      }

      await getUserFromDb(user.uid);
      await getLinksFromDb(user.uid);
      toast({
        title: "Login Successful",
        description: "Welcome to devslinks",
      });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                    errorMsg={form.formState.errors.password?.message}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <div className="text-sm font-semibold text-end hover:underline underline-offset-2">
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
};

export default Login;
