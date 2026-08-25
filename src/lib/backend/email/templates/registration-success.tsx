import * as React from "react";
import { EmailShell } from "../components/EmailShell";
import { Text, Section, Button } from "@react-email/components";
import { env } from "@/lib/config/env";

interface RegistrationSuccessEmailProps {
    missionId: string;
}

export const RegistrationSuccessEmail = ({ missionId }: RegistrationSuccessEmailProps) => {
    // Falls back seamlessly matching domain targets effectively
    const baseUrl = env.NEXT_PUBLIC_APP_URL || "https://localhost:3000";

    return (
        <EmailShell previewText="Your NLDS 2026 application dossier has been received.">
            <Text style={introText}>
                <strong>MISSION FILE RECEIVED</strong>
            </Text>

            <Text style={paragraph}>
                Agent,
                <br /><br />
                Your NLDS 2026 registration has been successfully submitted. Your dossier has natively entered the initial intelligence selection processing systems.
            </Text>

            <Section style={idSection}>
                <Text style={idLabel}>MISSION ID:</Text>
                <Text style={idValue}>[{missionId}]</Text>
            </Section>

            <Section style={statusContainer}>
                <Text style={statusHeader}>CURRENT STATUS</Text>
                <Text style={statusValue}>SUBMITTED</Text>
                <hr style={statusDivider} />
                <Text style={statusDesc}>Your application is now natively queued inside the internal review processes.</Text>
            </Section>

            <Text style={importantAlert}>
                <strong>IMPORTANT:</strong> This confirmation does NOT mean that you have been explicitly accepted. Your application dossier will undergo review by the OC Operations Command. Focus on monitoring the external portal channels.
            </Text>

            <Section style={buttonContainer}>
                <Button href={`${baseUrl}/register/status`} style={button}>
                    CHECK MISSION STATUS →
                </Button>
            </Section>

            <Text style={closing}>
                STAY READY.<br />
                Your mission is no longer completely in your hands. The selection protocol has actively begun.
            </Text>
        </EmailShell>
    );
};

const introText = {
    color: "#ffffff",
    fontSize: "18px",
    letterSpacing: "0.05em",
    marginTop: "0",
    marginBottom: "20px"
};

const paragraph = {
    fontSize: "15px",
    color: "#d4d4d8",
    lineHeight: "1.6",
    margin: "0",
};

const idSection = {
    marginTop: "30px",
    backgroundColor: "#18181b",
    borderLeft: "4px solid #eb5e28",
    padding: "15px 20px",
};

const idLabel = {
    color: "#a1a1aa",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.1em",
    margin: "0 0 5px 0",
};

const idValue = {
    color: "#ffffff",
    fontSize: "20px",
    fontFamily: "monospace",
    fontWeight: "bold",
    letterSpacing: "0.1em",
    margin: "0",
};

const statusContainer = {
    marginTop: "30px",
    border: "1px solid #27272a",
    padding: "20px",
};

const statusHeader = {
    color: "#a1a1aa",
    fontSize: "11px",
    letterSpacing: "0.1em",
    margin: "0 0 10px 0",
};

const statusValue = {
    color: "#eb5e28",
    fontSize: "18px",
    fontWeight: "bold",
    letterSpacing: "0.1em",
    margin: "0 0 15px 0",
};

const statusDivider = {
    border: "0",
    borderTop: "1px solid #27272a",
    margin: "0 0 15px 0",
};

const statusDesc = {
    color: "#a1a1aa",
    fontSize: "14px",
    margin: "0",
};

const importantAlert = {
    color: "#fb923c",
    fontSize: "13px",
    lineHeight: "1.6",
    marginTop: "30px",
    padding: "15px",
    border: "1px dashed #7c2d12",
    backgroundColor: "#2a1510",
};

const buttonContainer = {
    marginTop: "35px",
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: "14px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    padding: "14px 24px",
    letterSpacing: "0.05em",
};

const closing = {
    marginTop: "45px",
    color: "#a1a1aa",
    fontSize: "14px",
    fontStyle: "italic",
    lineHeight: "1.6",
    margin: "45px 0 0 0",
};
