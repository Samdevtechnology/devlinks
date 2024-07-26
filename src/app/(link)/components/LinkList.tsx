"use client";

import Emptylist from "./Emptylist";
import LinkForm from "./LinkForm";

import React, { useRef, useState, useEffect } from "react";
import AddLinkForm from "@/components/forms/Link";
import { useLinkStore } from "@/stores/linkStore";
import { Button } from "@/components/ui/button";

const LinkList = () => {
  const { links, removeLink } = useLinkStore();

  const onRemove = (id: string) => {
    removeLink(id);
  };
  return <LinkForm />;
  // return <>{links.length === 0 ? <Emptylist /> : <LinkForm />}</>;
};

export default LinkList;
