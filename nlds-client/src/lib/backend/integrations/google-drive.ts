import { google } from "googleapis";
import { env } from "@/lib/config/env";
import { Readable } from "stream";

export class GoogleDriveClient {
    private drive: any;

    constructor() {
        const clientEmail = env.GOOGLE_CLIENT_EMAIL;
        const privateKeyRaw = env.GOOGLE_PRIVATE_KEY;

        if (!clientEmail || !privateKeyRaw) {
            console.warn("[GoogleDriveClient] Missing credentials. Drive uploads will fail.");
            return;
        }

        const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            },
            scopes: ["https://www.googleapis.com/auth/drive.file"],
        });

        this.drive = google.drive({ version: "v3", auth });
    }

    /**
     * Uploads a file to a specific Google Drive folder.
     * @returns The Google Drive File ID.
     */
    async uploadFile(
        fileBuffer: Buffer,
        fileName: string,
        mimeType: string,
        folderId: string
    ): Promise<string> {
        if (!this.drive) {
            throw new Error("Google Drive client not initialized (missing credentials).");
        }

        if (!folderId) {
            throw new Error("Target Drive folder ID is not configured.");
        }

        const fileMetadata = {
            name: fileName,
            parents: [folderId],
        };

        const media = {
            mimeType: mimeType,
            body: Readable.from(fileBuffer),
        };

        try {
            const response = await this.drive.files.create({
                requestBody: fileMetadata,
                media: media,
                fields: "id",
                supportsAllDrives: true,
            });

            if (!response.data.id) {
                throw new Error("Drive API did not return a file ID.");
            }

            return response.data.id;
        } catch (error: any) {
            console.error("[GoogleDriveClient] Upload failed:", error.response?.data || error.message);
            throw new Error(`Drive Upload Failed: ${error.message}`);
        }
    }
}
