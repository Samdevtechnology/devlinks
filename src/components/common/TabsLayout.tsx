"use client";

import { Tabs } from "@/components/ui/tabs";
import useTabStore from "@/stores/tabStore";
import React from "react";

interface TabStoreProps {
  children: React.ReactNode;
}

const TabsLayout = ({ children }: TabStoreProps) => {
  const { activeTab, setActiveTab } = useTabStore();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      {children}
    </Tabs>
  );
};

export default TabsLayout;
