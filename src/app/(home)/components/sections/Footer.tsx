import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1C2239] text-white">
      <Container>
        <div>
          <div className="border-b  border-opacity-40 py-4 flex justify-between items-center">
            <Logo />
            <div>[ ] HNG</div>
          </div>
          <p className="text-center py-2 opacity-40">
            © 2024{" "}
            <Link
              href="//twitter.com/samdevtech"
              target="_blank"
              className="underline underline-offset-2"
            >
              SamdevTech
            </Link>
            . All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
