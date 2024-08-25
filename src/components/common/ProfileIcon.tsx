import useUserStore from "@/stores/userStore";
import Icons from "../icons/Icons";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut } from "firebase/auth";
import { auth } from "@/stores/firebase/config";
import { toast } from "../ui/use-toast";
import { useLinkStore } from "@/stores/linkStore";
import Link from "next/link";

const ProfileIcon = ({ className }: { className?: string }) => {
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
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            {user ? <Icons.UserFilled size={28} /> : <Icons.User size={28} />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 text-center">
          {user ? (
            <div>
              <h4>Hi, Dev</h4>
              <div className="border-t mt-2 pt-2">
                <Button
                  variant="destructive"
                  className="text-white"
                  onClick={handleLogOut}
                >
                  Log Out
                </Button>
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
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProfileIcon;
