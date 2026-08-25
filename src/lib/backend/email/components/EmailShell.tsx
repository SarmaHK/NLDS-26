import * as React from "react";
import { Body, Container, Head, Html, Preview, Text, Section, Hr, Img } from "@react-email/components";
import { env } from "@/lib/config/env";

interface EmailShellProps {
    previewText: string;
    children: React.ReactNode;
}

export const EmailShell = ({ previewText, children }: EmailShellProps) => {
    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Text style={classifiedText}>NLDS 2026 // CLASSIFIED TRANSMISSION</Text>
                        <Hr style={divider} />
                        <Text style={titleText}>MISSION STATUS</Text>
                    </Section>

                    <Section style={contentSection}>
                        {children}
                    </Section>

                    <Section style={footer}>
                        <Hr style={divider} />
                        <Text style={footerText}>
                            NLDS 2026<br />
                            CONFIDENTIAL — FOR INTENDED RECIPIENT ONLY
                        </Text>
                        <Text style={footerSubtext}>
                            If you did not request this communication, you can safely ignore this dossier.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: "#000000",
    color: "#E5E7EB",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    padding: "20px 0",
};

const container = {
    backgroundColor: "#09090b",
    border: "1px solid #27272a",
    margin: "0 auto",
    padding: "40px 30px",
    width: "100%",
    maxWidth: "600px",
};

const header = {
    marginBottom: "30px",
};

const classifiedText = {
    color: "#eb5e28",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    marginBottom: "10px",
};

const titleText = {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "0.05em",
    marginTop: "20px",
};

const divider = {
    borderColor: "#27272a",
    borderWidth: "1px",
    margin: "15px 0",
};

const contentSection = {
    color: "#a1a1aa",
    fontSize: "16px",
    lineHeight: "1.6",
};

const footer = {
    marginTop: "40px",
    textAlign: "center" as const,
};

const footerText = {
    color: "#71717a",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.05em",
};

const footerSubtext = {
    color: "#52525b",
    fontSize: "11px",
    marginTop: "10px",
};
