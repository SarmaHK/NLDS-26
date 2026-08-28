import * as React from "react";
import { EmailShell } from "../components/EmailShell";
import { Text, Section, Container } from "@react-email/components";

interface OTPEmailProps {
    otp: string;
}

export const OTPEmail = ({ otp }: OTPEmailProps) => {
    return (
        <EmailShell previewText="Agent, your verification code is inside.">
            <Text style={introText}>
                <strong>AGENT, YOUR VERIFICATION CODE</strong>
            </Text>

            <Text style={paragraph}>
                Your AIESEC identity verification has been initiated. Use the following verification code to proceed:
            </Text>

            <Section style={otpSection}>
                <Container style={otpContainer}>
                    <Text style={otpText}>{otp}</Text>
                </Container>
            </Section>

            <Text style={paragraph}>
                This verification code expires in <strong>5 minutes</strong>.
            </Text>

            <Text style={heading}>For your security:</Text>
            <ul style={list}>
                <li style={listItem}>Do not share this code.</li>
                <li style={listItem}>NLDS organizers will never ask for your OTP.</li>
                <li style={listItem}>If you did not request this verification code, you can safely ignore this email.</li>
            </ul>

            <Section style={statusSection}>
                <Text style={statusText}>
                    MISSION STATUS: <span style={statusHighlight}>IDENTITY VERIFICATION REQUIRED</span>
                </Text>
            </Section>
        </EmailShell>
    );
};

const introText = {
    color: "#FFFFFF",
    fontSize: "16px",
    letterSpacing: "0.1em",
    marginTop: "0",
    textTransform: "uppercase" as const,
};

const paragraph = {
    fontSize: "15px",
    color: "#E9DED1",
    lineHeight: "1.6",
};

const otpSection = {
    margin: "30px 0",
};

const otpContainer = {
    backgroundColor: "#000000",
    border: "1px solid #EA0000",
    padding: "24px",
    textAlign: "center" as const,
};

const otpText = {
    color: "#EA0000",
    fontSize: "36px",
    fontWeight: "bold",
    letterSpacing: "0.3em",
    margin: "0",
};

const heading = {
    color: "#F9B62A",
    fontWeight: "bold",
    fontSize: "13px",
    marginTop: "30px",
    marginBottom: "15px",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
};

const list = {
    paddingLeft: "20px",
    margin: "0",
    color: "#E9DED1",
};

const listItem = {
    marginBottom: "8px",
    fontSize: "14px",
};

const statusSection = {
    marginTop: "40px",
    borderTop: "1px solid #2A2A2A",
    paddingTop: "20px",
};

const statusText = {
    fontSize: "11px",
    color: "#888888",
    letterSpacing: "0.15em",
};

const statusHighlight = {
    color: "#EA0000",
    fontWeight: "bold",
};
