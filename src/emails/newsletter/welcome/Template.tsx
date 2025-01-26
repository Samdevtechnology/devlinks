import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface welcomeProps {
  name: string;
}

const baseUrl = process.env.VERCEL_URL || "http://localhost:3000";

const Welcome = ({ name = "Dev" }: welcomeProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Our Newsletter! 🎉</Preview>
      <Body style={main}>
        <Section style={imageSection}>
          <Img
            src={`${baseUrl}/logo-full.png`}
            style={image}
            width="175"
            height="45"
            alt="Devlinks Logo"
          />
        </Section>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={upperSection}>
              <Heading style={h1}>Welcome to Our Newsletter! 🎉</Heading>
              <Text style={mainText}>Hi {name},</Text>
              <Text style={mainText}>
                Thank you for subscribing to our newsletter! We&apos;re thrilled
                to have you join our community.You&apos;re now part of a
                community that&apos;s always in the loop with the latest
                updates, tips, and exclusive content.
              </Text>
              <Section>
                <Text style={subHead}>
                  Here&apos;s what you can look forward to:
                </Text>
                <ul>
                  <li style={li}>
                    📰
                    <div style={liDiv}>
                      Weekly updates on new features and improvements.
                    </div>
                  </li>
                  <li style={li}>
                    🎯
                    <div style={liDiv}>
                      Actionable tips to help you get the most out of our
                      services
                    </div>
                  </li>
                  <li style={li}>
                    🎁
                    <div style={liDiv}>
                      Exclusive offers and early access to upcoming releases.
                    </div>
                  </li>
                </ul>
                <Text style={mainText}>
                  We&apos;re thrilled to have you on board and can&apos;t wait
                  to share exciting news with you. Keep an eye on your inbox –
                  great things are coming!
                </Text>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                If you have any questions or need assistance, our support team
                is here to help.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            © 2024 Devlinks. All rights reserved.
            <br />
            Developer -{" "}
            <Link href="https://x.com/samdevtech" target="_blank" style={link}>
              SamdevTech
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const li = {
  marginBottom: "15px",
  display: "flex",
  listStyleType: "none",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const liDiv = {
  marginLeft: "4px",
};

const subHead = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  padding: "20px 0",
};

const image = { display: "block" as const, margin: "0 auto" };

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };

export default Welcome;
