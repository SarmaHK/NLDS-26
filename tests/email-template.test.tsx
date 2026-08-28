
import { render } from "@react-email/render";
import { OTPEmail } from "../src/lib/backend/email/templates/otp";
import { RegistrationSuccessEmail } from "../src/lib/backend/email/templates/registration-success";

describe("Phase 10B - Email Document Template Architectures", () => {

    test("1. OTP template renders correctly encapsulating dynamic values safely", async () => {
        const dummyCode = "889977";
        const html = await render(<OTPEmail otp={ dummyCode } />);

        expect(html).toContain("MISSION STATUS");
        expect(html).toContain(dummyCode);
        expect(html).toContain("5 minutes");
    });

    test("2. OTP does NOT explicitly leak sensitive session tokens natively", async () => {
        const html = await render(<OTPEmail otp="123123" />);
        expect(html).not.toContain("SESSION");
        expect(html).not.toContain("DATABASE_URL"); // Verifying Zod configs boundaries omitted completely
    });

    test("3. Registration Success Email natively parses without leaking PI info", async () => {
        const missionId = "NLDS26-TESTCASE";
        const html = await render(<RegistrationSuccessEmail missionId={ missionId } />);

        expect(html).toContain(missionId);
        expect(html).toContain("SUBMITTED");
        // Ensure misleading verbs are actively bypassed mapped appropriately manually avoiding confusion constraints:
        expect(html).not.toContain("ACCEPTED");
        expect(html).not.toContain("You're Accepted");
        expect(html).not.toContain("SELECTED");

        // Verify PII is NOT in the template structure
        expect(html).not.toContain("National ID");
        expect(html).not.toContain("Medical");
    });

    test("4. Email bounds render inline HTML elements mechanically passing React limitations", async () => {
        const html = await render(<OTPEmail otp="123123" />);
        expect(html).toContain("<!DOCTYPE html PUBLIC");
        expect(html).toContain("background-color");
    });
});
