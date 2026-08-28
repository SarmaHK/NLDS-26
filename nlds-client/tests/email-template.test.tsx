import { render } from "@react-email/render";
import { RegistrationSuccessEmail } from "../src/lib/backend/email/templates/registration-success";

describe("Phase 10B - Email Document Template Architectures", () => {
    test("1. Registration Success Email natively parses without leaking PI info", async () => {
        const missionId = "NLDS26-TESTCASE";
        const html = await render(<RegistrationSuccessEmail missionId={missionId} />);

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
});
