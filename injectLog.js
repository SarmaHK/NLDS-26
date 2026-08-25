const fs = require('fs');
let content = fs.readFileSync('src/app/api/register/submit/route.ts', 'utf8');
content = content.replace(
    'return NextResponse.json({ error: "Validation Failed"',
    'console.error(JSON.stringify(result.error.errors, null, 2)); return NextResponse.json({ error: "Validation Failed"'
);
fs.writeFileSync('src/app/api/register/submit/route.ts', content);
