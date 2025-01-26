import {
  Body,
  Button,
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
  name?: string;
}

const baseUrl =
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  process.env.VERCEL_URL ||
  "http://localhost:3000";

export const Welcome = ({ name = "Dev" }: welcomeProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Devlinks</Preview>
      <Body style={main}>
        <Section style={imageSection}>
          <Img
            src={`${baseUrl}/logo-full.svg`}
            width="175"
            height="45"
            alt="DevTools Logo"
          />
        </Section>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={upperSection}>
              <Heading style={h1}>Welcome to Devlinks 👋</Heading>
              <Text style={mainText}>Hi {name},</Text>
              <Text style={mainText}>
                Thank you for joining us! We&apos;re excited to have you as part
                of our community. Your account has been successfully created and
                you&apos;re all set to get started.
              </Text>
              <Section>
                <Text style={subHead}>Quick Start Guide</Text>

                <ul>
                  <li style={li}>
                    Complete your profile to personalize your experience
                  </li>
                  <li style={li}>Explore our features and services</li>
                  <li style={li}>
                    Connect with other members of our community
                  </li>
                </ul>
              </Section>
              <Section style={buttonContainer}>
                <Button href={baseUrl} style={button}>
                  Get Started
                </Button>
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
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
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
  backgroundColor: "#fff",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const buttonContainer = {
  margin: "27px auto",
  width: "auto",
};

const button = {
  backgroundColor: "#633CFF",
  color: "#fff",
  borderRadius: "8px",
  padding: "12px 18px",
  textAlign: "center" as const,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontWeight: "bold",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };

export default Welcome;
