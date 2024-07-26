"use client";

import React, { useRef, useState, useEffect } from "react";
import AddLinkForm from "@/components/forms/Link";
import { useLinkStore } from "@/stores/linkStore";
import { Button } from "@/components/ui/button";

const LinkForm = () => {
  const { links, addLink, removeLink, getAvailableLinkTypes } = useLinkStore();
  const [formIds, setFormIds] = useState<string[]>(() =>
    links.map((link) => link.id)
  );
  const formRefs = useRef<Record<string, React.RefObject<any>>>({});

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
    const validations = await Promise.all(
      formIds.map((id) => formRefs.current[id]?.current?.validate())
    );

    if (validations.every((isValid) => isValid)) {
      const newFormId = Date.now().toString();
      formRefs.current[newFormId] = React.createRef();
      setFormIds((prevFormIds) => [...prevFormIds, newFormId]);
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
      console.log("Submitted all");
    }
  };

  const availableLinkTypes = getAvailableLinkTypes();

  return (
    <div>
      {formIds.map((formId) => (
        <AddLinkForm
          key={formId}
          formId={formId}
          onRemove={() => handleRemoveForm(formId)} // Pass the formId correctly
          defaultValues={links.find((link) => link.id === formId)}
          ref={formRefs.current[formId]}
        />
      ))}
      {availableLinkTypes.length > 0 && (
        <Button onClick={handleAddForm}>Add Link</Button>
      )}
      <Button onClick={handleSave}>Save All</Button>
    </div>
  );
};

export default LinkForm;
