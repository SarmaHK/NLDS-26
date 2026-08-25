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
                        <Text style={logoText}>
                            NLDS<br />2026
                        </Text>
                        <Text style={classifiedText}>CLASSIFIED // OFFICIAL COMMUNICATION</Text>
                        <Hr style={dividerBrand} />
                    </Section>

                    <Section style={contentSection}>
                        {children}
                    </Section>

                    <Section style={footer}>
                        <Hr style={dividerSubtle} />
                        <Text style={footerText}>
                            NLDS 2026
                            <br />
                            AIESEC
                        </Text>
                        <Text style={footerWarning}>
                            CLASSIFIED // OFFICIAL COMMUNICATION
                        </Text>
                        <Text style={footerSubtext}>
                            This communication was generated as part of the NLDS 2026 registration process.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: "#000000",
    color: "#E9DED1",
    fontFamily: "Arial, Helvetica, sans-serif",
    padding: "20px 0",
};

const container = {
    backgroundColor: "#141414",
    border: "1px solid #333333",
    margin: "0 auto",
    padding: "40px 30px",
    width: "100%",
    maxWidth: "640px",
};

const header = {
    marginBottom: "40px",
};

const logoText = {
    color: "#FFFFFF",
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "0.15em",
    margin: "0 0 15px 0",
    lineHeight: "1.1",
};

const classifiedText = {
    color: "#EA0000",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    margin: "0 0 15px 0",
};

const dividerBrand = {
    borderColor: "#EA0000",
    borderWidth: "1px",
    margin: "0",
};

const dividerSubtle = {
    borderColor: "#2A2A2A",
    borderWidth: "1px",
    margin: "0 0 20px 0",
};

const contentSection = {
    color: "#E9DED1",
    fontSize: "15px",
    lineHeight: "1.6",
};

const footer = {
    marginTop: "40px",
    textAlign: "center" as const,
};

const footerText = {
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "bold",
    letterSpacing: "0.15em",
    margin: "0 0 10px 0",
    lineHeight: "1.4",
};

const footerWarning = {
    color: "#EA0000",
    fontSize: "10px",
    letterSpacing: "0.2em",
    margin: "0 0 15px 0",
};

const footerSubtext = {
    color: "#888888",
    fontSize: "11px",
    margin: "0",
};

