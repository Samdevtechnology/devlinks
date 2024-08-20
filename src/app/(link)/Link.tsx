"use client";

import Container from "@/components/common/Container";
import React, { useRef, useState, useEffect } from "react";
import AddLinkForm from "@/components/forms/Link";
import { useLinkStore } from "@/stores/linkStore";
import { Button } from "@/components/ui/button";
import Emptylist from "./components/Emptylist";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import useTabStore from "@/stores/tabStore";

const LinkForm = () => {
  const { links, addLink, removeLink, getAvailableLinkTypes } = useLinkStore();
  const [formIds, setFormIds] = useState<string[]>(() =>
    links.map((link) => link.id)
  );
  const formRefs = useRef<Record<string, React.RefObject<any>>>({});
  const { setActiveTab } = useTabStore();

  // Initialize refs for existing links
  useEffect(() => {
    links.forEach((link) => {
      if (!formRefs.current[link.id]) {
        formRefs.current[link.id] = React.createRef();
      }
    });
    setFormIds(links.map((link) => link.id));
  }, [links]);

  const handleAddForm = async () => {
    const allSaved = await handleSave();
    const availableLinkTypes = getAvailableLinkTypes();

    if (!availableLinkTypes.length) {
      return toast({
        variant: "destructive",
        title: "No available Platform",
        description: "There are no More available platforms",
        action: <ToastAction altText="Try again">Close</ToastAction>,
      });
    }

    if (allSaved) {
      const newFormId = Date.now().toString();
      formRefs.current[newFormId] = React.createRef();
      setFormIds((prevFormIds) => [newFormId, ...prevFormIds]);
    }
  };

  const handleRemoveForm = (formId: string) => {
    removeLink(formId);
    delete formRefs.current[formId];
    setFormIds((prevFormIds) => prevFormIds.filter((id) => id !== formId));
  };

  const handleSave = async () => {
    const validations = await Promise.all(
      formIds.map((id) => formRefs.current[id]?.current?.validate())
    );

    if (validations.every((isValid) => isValid)) {
      formIds.forEach((id) => {
        const link = formRefs.current[id]?.current?.getValues();

        if (link) {
          addLink(link);
        }
      });
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    const allSaved = await handleSave();
    setActiveTab("profile");
  };

  return (
    <Container className="h-[90%]">
      <div className="bg-white h-fit flex flex-col justify-between items-center pt-6 mt-6 rounded-xl">
        <div className="px-6">
          <div className="mb-10">
            <h1 className="font-bold text-2xl">Customize your links</h1>
            <p className="text-grey">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </div>
          <Button
            onClick={handleAddForm}
            size="lg"
            variant="outline"
            className="mb-6"
          >
            + Add new link
          </Button>
        </div>
        <div className="w-full px-6 pb-6">
          {formIds.length === 0 ? (
            <Emptylist />
          ) : (
            formIds.map((formId, index) => (
              <div key={formId} className="mb-4">
                <AddLinkForm
                  formId={formId}
                  formIndex={formIds.length - 1 - index}
                  onRemove={() => handleRemoveForm(formId)}
                  defaultValues={links.find((link) => link.id === formId)}
                  ref={formRefs.current[formId]}
                />
              </div>
            ))
          )}
        </div>
        <div className="border-t border-border p-4 w-full">
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </Container>
  );
};

export default LinkForm;
