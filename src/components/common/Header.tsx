import Container from "./Container";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import LogoIcon from "./LogoIcon";
import { Eye, UserCircle } from "@/lib/phosphorIconServer";
import { Button } from "../ui/button";
import Logo from "./Logo";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

const Header = () => {
  return (
    <Container className="px-0 sm:px-4">
      <div className="flex justify-between items-center bg-white rounded-xl sm:mt-4 py-2 px-4">
        <Link href="/">
          <LogoIcon className="sm:hidden" />
          <Logo className="hidden sm:flex" />
        </Link>
        <TabsList className="flex gap-8 py-0 h-full bg-white">
          <TabsTrigger value="link">
            <LinkIcon className="sm:mr-2 w-6 h-6 text-inherit" />
            <span className="hidden sm:flex">Link</span>
          </TabsTrigger>
          <TabsTrigger value="profile">
            <UserCircle className="sm:mr-2 w-6 h-6 text-inherit" />
            <span className="hidden  sm:flex">Profile Details</span>
          </TabsTrigger>
        </TabsList>
        <div>
          <Link href="/preview">
            <Button variant="secondary">
              <Eye className=" sm:hidden h-5 w-5" />
              <span className="hidden  sm:flex">Preview</span>
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Header;
