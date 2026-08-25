import * as React from "react";
import { EmailShell } from "../components/EmailShell";
import { Text, Section, Button } from "@react-email/components";
import { env } from "@/lib/config/env";

interface RegistrationSuccessEmailProps {
    missionId: string;
}

export const RegistrationSuccessEmail = (props: RegistrationSuccessEmailProps) => {
    return (
        <EmailShell previewText="Your NLDS 2026 application dossier has been successfully submitted.">
            <Text style={introText}>
                <strong>MISSION ACCEPTED</strong>
            </Text>

            <Text style={paragraph}>
                Your NLDS 2026 registration has been successfully submitted. Your dossier has entered the intelligence selection processing systems.
            </Text>

            <Section style={statusContainer}>
                <Text style={statusHeader}>CURRENT STATUS</Text>
                <Text style={statusValue}>SUBMITTED</Text>
                <hr style={statusDivider} />
                <Text style={statusDesc}>Your application is firmly secured and natively queued within the internal review loops.</Text>
            </Section>

            <Text style={importantAlert}>
                <strong>IMPORTANT:</strong> This confirmation represents successful database entry; it does not confirm your final selection. The OC Operations Command will review your dossier and direct communication will follow.
            </Text>

            <Text style={closing}>
                STAND BY.<br />
                The selection protocol has commenced.
            </Text>
        </EmailShell>
    );
};

const introText = {
    color: "#FFFFFF",
    fontSize: "18px",
    letterSpacing: "0.2em",
    marginTop: "0",
    marginBottom: "20px",
    textTransform: "uppercase" as const,
};

const paragraph = {
    fontSize: "15px",
    color: "#E9DED1",
    lineHeight: "1.6",
    margin: "0",
};

const statusContainer = {
    marginTop: "30px",
    backgroundColor: "#000000",
    borderLeft: "2px solid #EA0000",
    padding: "20px",
    borderTop: "1px solid #2A2A2A",
    borderRight: "1px solid #2A2A2A",
    borderBottom: "1px solid #2A2A2A",
};

const statusHeader = {
    color: "#888888",
    fontSize: "10px",
    letterSpacing: "0.2em",
    margin: "0 0 10px 0",
    textTransform: "uppercase" as const,
};

const statusValue = {
    color: "#EA0000",
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: "0.15em",
    margin: "0 0 15px 0",
};

const statusDivider = {
    border: "0",
    borderTop: "1px solid #2A2A2A",
    margin: "0 0 15px 0",
};

const statusDesc = {
    color: "#E9DED1",
    fontSize: "14px",
    margin: "0",
    lineHeight: "1.6",
};

const importantAlert = {
    color: "#F9B62A",
    fontSize: "13px",
    lineHeight: "1.6",
    marginTop: "30px",
    padding: "15px",
    border: "1px dashed #F9B62A",
    backgroundColor: "#1C1405",
};

const closing = {
    marginTop: "45px",
    color: "#888888",
    fontSize: "13px",
    fontStyle: "italic",
    lineHeight: "1.6",
    letterSpacing: "0.05em",
};
