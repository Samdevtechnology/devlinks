import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Hamburger } from "../icons/Icons";
import Logo from "./Logo";
import Link from "next/link";
import useUserStore from "@/stores/userStore";
import { useLinkStore } from "@/stores/linkStore";
import { toast } from "../ui/use-toast";
import { signOut } from "firebase/auth";
import { auth } from "@/stores/firebase/config";

const HamburgerMenu = ({ className }: { className?: string }) => {
  const { user, clearUser } = useUserStore();
  const { clearLinks } = useLinkStore();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      clearUser();
      clearLinks();
      toast({
        title: "Log Out Successful",
        description: "You have been logged out.",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Log Out Failed",
        description: "There was an error logging out. Please try again.",
      });
    }
  };
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="text-primary">
            <Hamburger color="currentColor" size={28} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <div className="mt-10">
            {user ? (
              <div>
                <h4>Hi, Dev</h4>
                <div className="border-t mt-2 pt-2">
                  <SheetClose asChild>
                    <Button
                      variant="destructive"
                      className="text-white"
                      onClick={handleLogOut}
                    >
                      Log Out
                    </Button>
                  </SheetClose>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <Link href="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                </div>
                <div className="border-t mt-2 pt-2">
                  <Link href="/register">
                    <Button>Register</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HamburgerMenu;
