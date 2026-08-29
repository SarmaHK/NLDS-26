import { google } from "googleapis";
import { env } from "@/lib/config/env";

export class GoogleSheetsClient {
  private auth: any;
  private sheets: any;
  private spreadsheetId: string;

  constructor() {
    const clientEmail = env.GOOGLE_CLIENT_EMAIL?.trim();
    const privateKeyRaw = env.GOOGLE_PRIVATE_KEY; // Kept intact, handled below
    this.spreadsheetId = env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() || "";

    if (!clientEmail || !privateKeyRaw || !this.spreadsheetId) {
      console.warn(
        "[GoogleSheetsClient] Missing required credentials. Sheet execution disabled.",
      );
    }

    // Properly resolving encoded newlines mapping strictly over backend env structures mapping safely
    const privateKey = (privateKeyRaw || "").replace(/\\n/g, "\n");

    this.auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    this.sheets = google.sheets({ version: "v4", auth: this.auth });
  }

  /**
   * Idempotently updates or appends a row mapping against the explicit Reference Code (Mission ID).
   */
  async upsertRow(
    referenceCode: string,
    values: (string | number | boolean)[],
  ) {
    console.log(
      `GOOGLE_CLIENT_EMAIL: ${env.GOOGLE_CLIENT_EMAIL ? "configured" : "missing"}`,
    );
    console.log(
      `GOOGLE_PRIVATE_KEY: ${env.GOOGLE_PRIVATE_KEY ? "configured" : "missing"}`,
    );
    console.log(
      `GOOGLE_SHEETS_SPREADSHEET_ID: ${this.spreadsheetId ? "configured" : "missing"}`,
    );

    if (!this.spreadsheetId) {
      throw new Error(
        "Google Sheets Integration is not configured. Missing Spreadsheet ID.",
      );
    }

    try {
      // Retrieve spreadsheet metadata to dynamically get the first sheet's name
      const spreadsheetMeta = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
      });
      const firstSheetTitle = spreadsheetMeta.data.sheets[0].properties.title;
      const rangePrefix = `'${firstSheetTitle}'`;

      // Retrieve Mission ID mapping mapping directly against Column A
      const currentStructure = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${rangePrefix}!A:A`,
      });
      console.log(`Google Sheets API status: ${currentStructure.status}`);

      const rows = currentStructure.data.values || [];
      let targetRowIndex = -1;

      // Strict iteration searching explicit ID matches
      for (let i = 0; i < rows.length; i++) {
        if (rows[i][0] === referenceCode) {
          targetRowIndex = i + 1; // Explicit 1-indexed conversion logic natively matching API format
          break;
        }
      }

      if (targetRowIndex === -1) {
        // If implicit identity fails, append as a strict new Registration
        await this.sheets.spreadsheets.values.append({
          spreadsheetId: this.spreadsheetId,
          range: `${rangePrefix}!A:A`, // Automatically calculates horizontal ranges
          valueInputOption: "USER_ENTERED",
          requestBody: { values: [values] },
        });
      } else {
        // Existing Idempotent Update
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: `${rangePrefix}!A${targetRowIndex}`,
          valueInputOption: "USER_ENTERED",
          requestBody: { values: [values] },
        });
      }

      return {
        targetRowIndex:
          targetRowIndex === -1 ? "APPENDED" : `UPDATED_ROW_${targetRowIndex}`,
      };
    } catch (error: any) {
      console.log(
        `Google Sheets API error: ${error?.message || error?.code || "UNKNOWN"}`,
      );
      console.error(
        `[GoogleSheetsClient] Failed to upsert row natively. Error code: ${error?.code || "UNKNOWN"}`,
      );
      throw new Error(
        "A fatal error occurred synchronizing parameters via Google Sheets API internal protocols.",
      );
    }
  }
}
