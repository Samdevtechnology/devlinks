"use client";

import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkSchema, Link } from "./schemas/linkSchema";
import { Input } from "../ui/input";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
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
      defaultValues: defaultValues || { url: "" },
    });
    const { getAvailableLinkTypes } = useLinkStore();
    const availableLinkTypes = getAvailableLinkTypes();

    const { control, trigger, getValues, watch } = form;

    // Watch the "type" and "url" fields and validate on change
    useEffect(() => {
      const subscription = watch((value, { name }) => {
        if (name) {
          trigger(name);
        }
      });
      return () => subscription.unsubscribe();
    }, [watch, trigger]);

    useImperativeHandle(ref, () => ({
      validate: () => trigger(),
      getValues: () => ({ ...getValues(), id: formId }),
    }));

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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    errorMsg={form.formState.errors.type?.message}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Please Select a Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {defaultValues?.type && (
                        <SelectItem key={field.value} value={field.value}>
                          {field.value}
                        </SelectItem>
                      )}
                      {availableLinkTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
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
