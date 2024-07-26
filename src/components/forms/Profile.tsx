"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ImageUpload from "../ui/imageUpload";
import React from "react";

const profileSchema = z.object({
  image: z
    .union([z.instanceof(File), z.null()])
    .refine((file) => file === null || file.type.startsWith("image/"), {
      message: "Must be an image file",
    }),
  firstName: z.string().min(1, "Can’t be empty"),
  lastName: z.string().min(1, "Can’t be empty"),
  email: z.string().min(1, "Can’t be empty").email(),
});

interface profileFormProps {
  onSubmit?: () => void;
}

const Profile = React.forwardRef<{ submit: () => void }, profileFormProps>(
  (props, ref) => {
    const formRef = React.useRef<HTMLFormElement | null>(null);
    const form = useForm<z.infer<typeof profileSchema>>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        image: null,
        firstName: "",
        lastName: "",
        email: "",
      },
    });

    const handleSubmit = (values: z.infer<typeof profileSchema>) => {
      console.log(values);
    };

    React.useImperativeHandle(ref, () => ({
      submit: () => {
        if (formRef.current) {
          formRef.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
        }
      },
    }));

    return (
      <Form {...form}>
        <form
          ref={formRef}
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      label="Profile picture"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="bg-grey-light rounded-xl p-5 flex flex-col gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>First name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ben"
                        type="text"
                        {...field}
                        errorMsg={form.formState.errors.firstName?.message}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Last name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Wright"
                        type="text"
                        {...field}
                        errorMsg={form.formState.errors.lastName?.message}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ben@example.com"
                        type="email"
                        {...field}
                        errorMsg={form.formState.errors.email?.message}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
          <Button type="submit" className="hidden">
            Save
          </Button>
        </form>
      </Form>
    );
  }
);

Profile.displayName = "Profile Form";

export default Profile;
