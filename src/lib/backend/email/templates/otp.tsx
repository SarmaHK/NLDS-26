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
    color: "#ffffff",
    fontSize: "18px",
    letterSpacing: "0.05em",
    marginTop: "0",
};

const paragraph = {
    fontSize: "15px",
    color: "#d4d4d8",
    lineHeight: "1.6",
};

const otpSection = {
    margin: "30px 0",
};

const otpContainer = {
    backgroundColor: "#18181b",
    border: "1px dashed #eb5e28",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center" as const,
};

const otpText = {
    color: "#eb5e28",
    fontSize: "32px",
    fontWeight: "bold",
    letterSpacing: "0.2em",
    margin: "0",
};

const heading = {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "15px",
    marginTop: "30px",
    marginBottom: "15px",
};

const list = {
    paddingLeft: "20px",
    margin: "0",
    color: "#a1a1aa",
};

const listItem = {
    marginBottom: "8px",
    fontSize: "14px",
};

const statusSection = {
    marginTop: "40px",
    borderTop: "1px solid #27272a",
    paddingTop: "20px",
};

const statusText = {
    fontSize: "12px",
    color: "#71717a",
    letterSpacing: "0.05em",
};

const statusHighlight = {
    color: "#eb5e28",
    fontWeight: "bold",
};
