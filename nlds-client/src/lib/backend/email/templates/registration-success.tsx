import * as React from "react";
import { EmailShell } from "../components/EmailShell";
import { Text, Section, Hr } from "@react-email/components";

interface RegistrationSuccessEmailProps {
    missionId: string;
}

export const RegistrationSuccessEmail = ({
    missionId,
}: RegistrationSuccessEmailProps) => {
    return (
        <EmailShell previewText="MISSION RECEIVED | Your NLDS 2026 application is under review">
            {/* Logo / Classified Stamp */}
            <Section style={stampContainer}>
                <Text style={stamp}>TOP SECRET // CLEARANCE: EYES ONLY</Text>
            </Section>

            {/* Mission Header */}
            <Text style={missionTitle}>MISSION RECEIVED.</Text>

            <Text style={missionSubtitle}>
                Your application has been logged into the system.
            </Text>

            <Hr style={divider} />

            {/* Greeting */}
            <Text style={paragraph}>
                <strong style={white}>Dear Future Agent,</strong>
            </Text>

            <Text style={paragraph}>
                Your application has been <strong style={white}>successfully received.</strong>
                <br />
                But this is only the beginning.
            </Text>

            <Text style={paragraph}>
                Your profile has now entered <strong style={red}>MISSION CONTROL</strong>,
                where every application will be carefully reviewed. Out of the many who
                step forward, only those selected will receive clearance to join the mission.
            </Text>

            <Text style={paragraph}>
                At <strong style={white}>NLDS 2026</strong>, you'll be challenged to{" "}
                <strong style={white}>
                    think beyond limits, work with unexpected allies,
                    discover new perspectives, and create stories worth bringing back home.
                </strong>
            </Text>

            {/* Mission Brief - Interactive Button Style */}
            <Section style={briefContainer}>
                <Text style={briefLabel}>
                    // YOUR NEXT OBJECTIVE
                </Text>

                <Text style={briefText}>
                    For now, your mission is simple:
                </Text>

                <Text style={objective}>
                    STAY ALERT.<br />
                    STAY READY.<br />
                    AWAIT YOUR CLEARANCE.
                </Text>

                <Section style={buttonContainer}>
                    <Text style={button}>ACCESS MISSION DOSSIER</Text>
                </Section>
            </Section>

            <Text style={paragraph}>
                Your fate will be revealed soon.
            </Text>

            {/* Status Dossier - Enhanced */}
            <Section style={statusContainer}>
                <Text style={statusHeader}>
                    MISSION DOSSIER
                </Text>

                <Section style={statusRow}>
                    <span style={statusLabel}>MISSION STATUS</span>
                    <strong style={statusValue}>
                        APPLICATION RECEIVED
                    </strong>
                </Section>

                <Section style={statusRow}>
                    <span style={statusLabel}>ACCESS LEVEL</span>
                    <strong style={statusValue}>
                        UNDER REVIEW
                    </strong>
                </Section>

                <Section style={statusRow}>
                    <span style={statusLabel}>MISSION DATES</span>
                    <strong style={statusValue}>
                        09 • 10 • 11 OCTOBER 2026
                    </strong>
                </Section>

                <Section style={statusRow}>
                    <span style={statusLabel}>MISSION ID</span>
                    <strong style={statusValue}>
                        {missionId}
                    </strong>
                </Section>
            </Section>

            {/* Final Message - Quote with Cinematic Flair */}
            <Section style={quoteContainer}>
                <Text style={quoteMark}>“</Text>

                <Text style={quote}>
                    Until your clearance arrives, consider this your first mission:
                    <br />
                    <strong>Stay curious.</strong>
                </Text>
            </Section>

            {/* Signature */}
            <Text style={closing}>
                MISSION CONTROL
            </Text>

            <Text style={signature}>
                NLDS 2026
                <br />
                <span style={muted}>AIESEC in Sri Lanka</span>
            </Text>

            <Text style={classifiedBottom}>
                END OF TRANSMISSION • CLASSIFIED
            </Text>
        </EmailShell>
    );
};

/* ─────────────────────────────────────────────
   STYLES - REVAMPED FOR MISSION IMPOSSIBLE THEME
───────────────────────────────────────────── */

const stampContainer = {
    marginBottom: '20px',
};

const stamp = {
    color: "#EA0000",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "0.3em",
    margin: "0",
    textTransform: "uppercase" as const,
    border: "1px solid #EA0000",
    padding: "6px 12px",
    display: "inline-block",
    backgroundColor: "#0A0A0A",
};

const missionTitle = {
    color: "#FFFFFF",
    fontSize: "36px",
    lineHeight: "1.1",
    fontWeight: "900",
    letterSpacing: "0.1em",
    margin: "0 0 10px 0",
    textTransform: "uppercase" as const,
    textShadow: "0 0 15px rgba(234, 0, 0, 0.4)",
};

const missionSubtitle = {
    color: "#AAAAAA",
    fontSize: "13px",
    letterSpacing: "0.08em",
    margin: "0 0 25px 0",
};

const divider = {
    borderColor: "#242424",
    margin: "25px 0 25px 0",
};

const paragraph = {
    color: "#D8D0C7",
    fontSize: "15px",
    lineHeight: "1.8",
    margin: "0 0 22px 0",
};

const white = {
    color: "#FFFFFF",
};

const red = {
    color: "#EA0000",
};

const briefContainer = {
    marginTop: "35px",
    marginBottom: "30px",
    padding: "25px 25px",
    backgroundColor: "#0A0A0A",
    border: "1px solid #333",
    borderLeft: "5px solid #EA0000",
    borderRadius: "4px",
    boxShadow: "0 0 20px rgba(234, 0, 0, 0.1)",
};

const briefLabel = {
    color: "#666666",
    fontSize: "10px",
    fontWeight: "bold",
    letterSpacing: "0.25em",
    margin: "0 0 14px 0",
};

const briefText = {
    color: "#D8D0C7",
    fontSize: "14px",
    margin: "0 0 18px 0",
};

const objective = {
    color: "#FFFFFF",
    fontSize: "18px",
    fontWeight: "900",
    lineHeight: "1.7",
    letterSpacing: "0.12em",
    margin: "0 0 25px 0",
    textShadow: "0 0 10px rgba(234, 0, 0, 0.3)",
};

const buttonContainer = {
    backgroundColor: "#EA0000",
    padding: "12px 20px",
    textAlign: "center" as const,
    borderRadius: "4px",
    width: "fit-content",
};

const button = {
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.2em",
    margin: "0",
    textTransform: "uppercase" as const,
};

const statusContainer = {
    marginTop: "35px",
    marginBottom: "35px",
    padding: "25px 20px",
    backgroundColor: "#050505",
    border: "1px solid #242424",
    borderRadius: "4px",
};

const statusHeader = {
    color: "#EA0000",
    fontSize: "10px",
    fontWeight: "bold",
    letterSpacing: "0.3em",
    margin: "0 0 22px 0",
    paddingBottom: "14px",
    borderBottom: "1px solid #242424",
};

const statusRow = {
    margin: "0 0 18px 0",
};

const statusLabel = {
    color: "#666666",
    fontSize: "9px",
    letterSpacing: "0.2em",
    display: "block",
    marginBottom: "4px",
};

const statusValue = {
    color: "#F1ECE5",
    fontSize: "14px",
    letterSpacing: "0.08em",
    display: "block",
};

const quoteContainer = {
    marginTop: "35px",
    marginBottom: "35px",
    padding: "10px 0 10px 25px",
    borderLeft: "3px solid #EA0000",
    backgroundColor: "rgba(234, 0, 0, 0.03)",
};

const quoteMark = {
    color: "#EA0000",
    fontSize: "32px",
    lineHeight: "1",
    margin: "0 0 -10px 0",
    opacity: "0.6",
};

const quote = {
    color: "#A8A09A",
    fontSize: "14px",
    lineHeight: "1.8",
    fontStyle: "italic",
    margin: "0",
};

const closing = {
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "900",
    letterSpacing: "0.25em",
    margin: "0 0 5px 0",
    textTransform: "uppercase" as const,
};

const signature = {
    color: "#EA0000",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.15em",
    lineHeight: "1.7",
    margin: "0",
};

const muted = {
    color: "#666666",
    fontSize: "10px",
    letterSpacing: "0.08em",
};

const classifiedBottom = {
    color: "#333333",
    fontSize: "8px",
    letterSpacing: "0.3em",
    textAlign: "center" as const,
    margin: "45px 0 0 0",
    textTransform: "uppercase" as const,
};