"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useState } from "react";
import { Mail } from "../icons/Icons";
import { sendNewsletterWelcomeEmail } from "@/emails/newsletter/welcome";

const newsletterSchema = z.object({
  email: z.string().min(1, "Email can’t be empty").email(),
});

const Newsletter = () => {
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async ({ email }: z.infer<typeof newsletterSchema>) => {
    try {
      console.log(email);
      // const res = await addUserToEmailList(

      // );
      const formData = new FormData();
      formData.append("email", email);

      sendNewsletterWelcomeEmail(formData);
      setSubscribed(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-4">
      {subscribed ? (
        <div>
          <div className="flex justify-center items-center text-lg font-semibold text-primary">
            Subscribed. Thank You &nbsp; <Mail />
          </div>
          <div className="text-center text-sm text-gray-600">
            We will send you updates about our latest projects and features.
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form className="relative" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        className="bg-white h-12 dark:text-background pr-28"
                      />
                    </FormControl>
                    <FormMessage className="absolute font-semibold" />
                  </FormItem>
                );
              }}
            />
            <Button
              size="sm"
              type="submit"
              className="bg-primary w-fit absolute transform -translate-y-1/2 top-1/2 right-2"
            >
              Subscribe
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default Newsletter;
