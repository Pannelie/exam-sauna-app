import crypto from "node:crypto";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";

export function parseServiceAccount() {
    const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!rawJson) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON");
    try {
        return JSON.parse(rawJson);
    } catch {
        throw new Error("Invalid GOOGLE_SERVICE_ACCOUNT_JSON");
    }
}

function toBase64Url(value) {
    return Buffer.from(value).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function createSignedJwt(serviceAccount) {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: "RS256", typ: "JWT" };
    const payload = {
        iss: serviceAccount.client_email,
        scope: GOOGLE_CALENDAR_SCOPE,
        aud: GOOGLE_TOKEN_URL,
        iat: now,
        exp: now + 3600,
    };
    const encodedHeader = toBase64Url(JSON.stringify(header));
    const encodedPayload = toBase64Url(JSON.stringify(payload));
    const unsignedToken = `${encodedHeader}.${encodedPayload}`;
    const signer = crypto.createSign("RSA-SHA256");
    signer.update(unsignedToken);
    signer.end();
    const signature = signer.sign(serviceAccount.private_key);
    const encodedSignature = signature.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    return `${unsignedToken}.${encodedSignature}`;
}

export async function getAccessToken() {
    const serviceAccount = parseServiceAccount();
    const assertion = createSignedJwt(serviceAccount);
    const response = await fetch(GOOGLE_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion,
        }),
    });
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Google token error: ${errorBody}`);
    }
    const data = await response.json();
    return data.access_token;
}
