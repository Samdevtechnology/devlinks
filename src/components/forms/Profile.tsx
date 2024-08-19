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
import { Toggle } from "../ui/toggle";
import useUserStore from "@/stores/userStore";
import { ToggleLeft, ToggleRight } from "lucide-react";

const profileSchema = z.object({
  image: z.string().url().optional(),
  firstName: z.string().min(1, "Can’t be empty").optional(),
  lastName: z.string().min(1, "Can’t be empty").optional(),
  nickname: z.string().optional(),
  email: z.string().min(1, "Can’t be empty").email(),
  useNickname: z.boolean().default(false),
});

interface profileFormProps {
  onSubmit?: () => void;
}

const Profile = React.forwardRef<{ submit: () => void }, profileFormProps>(
  (props, ref) => {
    const { user, updateUser, saveUserToDb } = useUserStore();
    const emptyUser = {
      image: "",
      firstName: "",
      lastName: "",
      email: "",
      nickname: "",
      useNickname: false,
    };

    const transformedUser = user
      ? {
          email: user.email || "",
          image: user.photoURL || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          nickname: user.nickname || "",
          useNickname: user.useNickname ?? false,
        }
      : emptyUser;

    const formRef = React.useRef<HTMLFormElement | null>(null);
    const form = useForm<z.infer<typeof profileSchema>>({
      resolver: zodResolver(profileSchema),
      defaultValues: transformedUser,
    });

    const handleSubmit = (values: z.infer<typeof profileSchema>) => {
      console.log("submitted!!!", values);
      const updatedUser = {
        ...values,
        uid: user?.uid || "",
      };
      updateUser({ ...updatedUser });
      saveUserToDb();
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
                      onChange={(image: string) => {
                        field.onChange(image);
                        updateUser({ photoURL: image });
                      }}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="bg-grey-light rounded-xl p-5 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-4">
              <span className="w-full">
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
                            onChange={(e) => {
                              field.onChange(e);
                              updateUser({ firstName: e.target.value });
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </span>
              <span className="w-full">
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
                            onChange={(e) => {
                              field.onChange(e);
                              updateUser({ lastName: e.target.value });
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </span>
            </div>

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => {
                return (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Nickname (optional)</FormLabel>
                      <div>
                        <FormField
                          control={form.control}
                          name="useNickname"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Toggle
                                  size="sm"
                                  pressed={field.value}
                                  onPressedChange={(value) => {
                                    field.onChange(value);
                                    updateUser({ useNickname: value });
                                  }}
                                >
                                  {field.value ? (
                                    <ToggleRight />
                                  ) : (
                                    <ToggleLeft />
                                  )}
                                </Toggle>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Nickname"
                        type="text"
                        {...field}
                        errorMsg={form.formState.errors.nickname?.message}
                        onChange={(e) => {
                          field.onChange(e);
                          updateUser({ nickname: e.target.value });
                        }}
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
                        onChange={(e) => {
                          field.onChange(e);
                          updateUser({ email: e.target.value });
                        }}
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
