import { google } from 'googleapis';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

async function testDrive() {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
    const folderId = process.env.GOOGLE_DRIVE_CV_FOLDER_ID;

    console.log("Email:", clientEmail);
    console.log("Folder:", folderId);

    if (!privateKeyRaw) {
        console.error("Missing private key");
        return;
    }

    const privateKey = privateKeyRaw.replace(/\\n/g, "\n");
    const auth = new google.auth.GoogleAuth({
        credentials: { client_email: clientEmail, private_key: privateKey },
        scopes: ["https://www.googleapis.com/auth/drive"], // Note: full drive scope for testing
    });

    const drive = google.drive({ version: 'v3', auth });

    try {
        const metadata = await drive.files.get({ fileId: folderId, fields: 'id, name, capabilities' });
        console.log("SUCCESS! Found folder:", metadata.data.name);
        console.log("Capabilities:", metadata.data.capabilities);
    } catch (e: any) {
        console.error("Error accessing Drive:");
        if (e.response && e.response.data) {
            console.error(JSON.stringify(e.response.data, null, 2));
        } else {
            console.error(e.message);
        }
    }
}

testDrive();
