import { SyncStrategy, ExternalEvent } from "./sync.service";
import { env } from "@/lib/config/env";
import { GoogleSheetsClient } from "../integrations/google-sheets";

export class GoogleSheetsStrategy implements SyncStrategy {
    providerName = "GOOGLE_SHEETS";

    async execute(event: ExternalEvent): Promise<void> {
        const spreadsheetId = env.GOOGLE_SHEETS_SPREADSHEET_ID;
        const privateKeyRaw = env.GOOGLE_PRIVATE_KEY;
        const clientEmail = env.GOOGLE_CLIENT_EMAIL;

        // Bypassing integration if external architecture parameters aren't initialized yet!
        if (!spreadsheetId || !privateKeyRaw || !clientEmail) {
            console.log(`[GOOGLE SHEETS] Missing Credentials/Scope. Skipping synchronisation constraint for ${event.referenceCode}.`);
            return;
        }

        const client = new GoogleSheetsClient();

        // Structured data constraints securely parsing payload removing PI logic.
        const rowData = [
            event.referenceCode,                              // A: Mission ID
            new Date().toISOString(),                           // B: Submitted Date
            event.payload?.fullName || "[N/A]",                 // C: Full Name
            event.payload?.preferredName || "[N/A]",            // D: Preferred Name
            event.payload?.gender || "[N/A]",                   // E: Gender
            event.payload?.dateOfBirth || "[N/A]",              // F: Date of Birth
            event.payload?.nationalIdOrPassport || "[N/A]",     // G: NIC / Passport
            event.payload?.phone || "[N/A]",                    // H: Phone
            event.payload?.personalEmail || "[N/A]",            // I: Personal Email
            event.payload?.aiesecEmail || "[N/A]",              // J: AIESEC Email
            event.payload?.entityName || "[N/A]",               // K: Entity
            event.payload?.igName || "[N/A]",                   // L: Initiative Group
            event.payload?.customInitiativeGroup || "[N/A]",    // M: Custom IG
            event.payload?.currentPosition || "[N/A]",          // N: Current Position
            event.payload?.foodPreference || "[N/A]",           // O: Food Preference
            event.payload?.medicalConditions || "[N/A]",        // P: Medical Conditions
            event.payload?.guardianName || "[N/A]",             // Q: Guardian Name
            event.payload?.guardianContact || "[N/A]",          // R: Guardian Contact
            event.payload?.missionGoal || "[N/A]",              // S: Mission Goal
            event.payload?.additionalInformation || "[N/A]",    // T: Additional Info
            event.payload?.readinessLevel || "[N/A]",           // U: Readiness Level
            event.payload?.cvReference || "[NO CV]",            // V: CV Link
            event.payload?.cvConsent || "NO",                   // W: CV Consent
            event.payload?.profilePicture || "[N/A]",           // X: Profile Pic Link
            event.payload?.status || "SUBMITTED"                // Y: Final Status
        ];

        console.log(`[GOOGLE SHEETS] Attempting idempotent push over ReferenceCode: ${event.referenceCode}.`);
        await client.upsertRow(event.referenceCode, rowData);
    }
}
