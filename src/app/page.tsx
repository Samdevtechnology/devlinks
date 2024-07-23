import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/ui/imageUpload";

export default function Home() {
  return (
    <div className="flex w-full h-screen justify-center gap-8 items-center">
      <ImageUpload />
    </div>
  );
}

{
  /* <Tabs defaultValue="account" className="w-[400px]">
<TabsList className="  ">
  <TabsTrigger value="account">
    <Star className="mr-2 w-5 h-5 text-inherit" /> Account
  </TabsTrigger>
  <TabsTrigger value="password">
    <Star className="mr-2 w-5 h-5 text-inherit" />
    Password
  </TabsTrigger>
  <TabsTrigger value="pass">
    <Star className="mr-2 w-5 h-5 text-inherit" />
    Password
  </TabsTrigger>
</TabsList>
<TabsContent value="account">
  Make changes to your account here.
</TabsContent>
<TabsContent value="password">Change your password here.</TabsContent>
<TabsContent value="pass">Change your pass.</TabsContent>
</Tabs> */
}

{
  /* <Select>
<SelectTrigger className="w-[180px]">
  <SelectValue placeholder="Theme" />
</SelectTrigger>
<SelectContent>
  <SelectItem value="light">Light</SelectItem>
  <SelectItem value="dark">Dark</SelectItem>
  <SelectItem value="system">System</SelectItem>
</SelectContent>
</Select> */
}
