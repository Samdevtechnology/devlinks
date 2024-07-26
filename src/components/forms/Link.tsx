"use client";

import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkSchema, Link } from "./schemas/linkSchema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LinkType } from "@/lib/linkTypes";
import { useLinkStore } from "@/stores/linkStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AddLinkFormProps {
  formId: string;
  onRemove: (formId: string) => void;
  defaultValues?: Link;
  formIndex: number;
}

interface FormRef {
  validate: () => Promise<boolean>;
  getValues: () => Link;
}

const AddLinkForm = forwardRef<FormRef, AddLinkFormProps>(
  ({ formId, onRemove, defaultValues, formIndex }, ref) => {
    const form = useForm<Link>({
      resolver: zodResolver(linkSchema),
      defaultValues: defaultValues || { type: LinkType.GITHUB, url: "" },
    });
    const { getAvailableLinkTypes } = useLinkStore();
    const availableLinkTypes = getAvailableLinkTypes();

    const { control, trigger, getValues, setValue } = form;

    useImperativeHandle(ref, () => ({
      validate: () => trigger(),
      getValues: () => ({ ...getValues(), id: formId }),
    }));

    useEffect(() => {
      if (defaultValues) {
        setValue("type", defaultValues.type);
        setValue("url", defaultValues.url);
      }
    }, [defaultValues, setValue]);

    return (
      <FormProvider {...form}>
        <form className="bg-grey-light rounded-xl p-5 w-full">
          <div className="flex justify-between items-center">
            <span className=" text-grey font-bold">{`Link #${
              formIndex + 1
            }`}</span>

            <button
              className="text-grey"
              type="button"
              onClick={() => onRemove(formId)}
            >
              Remove
            </button>
          </div>

          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-normal text-grey-dark">
                  Platform
                </FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Please Select a Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableLinkTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-normal text-grey-dark">
                  Link
                </FormLabel>
                <FormControl>
                  <Input
                    errorMsg={form.formState.errors.url?.message}
                    placeholder="Enter URL"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </FormProvider>
    );
  }
);

AddLinkForm.displayName = "AddLinkForm";

export default AddLinkForm;
