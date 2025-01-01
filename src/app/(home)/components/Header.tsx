import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import ThemeToggleBtn from "@/components/common/ThemeToggleBtn";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Container>
        <div className="flex justify-between items-center my-4">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggleBtn />
            <Link href="/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
