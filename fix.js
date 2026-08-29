
const fs = require("fs");
const file = "nlds-client/src/lib/backend/events/email.strategy.ts";
let content = fs.readFileSync(file, "utf8");
content = `import * as React from "react";\n` + content;
content = content.replace(
    "const htmlFormat = await render(RegistrationSuccessEmail({ missionId: event.referenceCode }));",
    "const htmlFormat = await render(React.createElement(RegistrationSuccessEmail, { missionId: event.referenceCode, recipientName: event.payload?.preferredName || event.payload?.fullName || \"AGENT\" }));"
);
fs.writeFileSync(file, content);

