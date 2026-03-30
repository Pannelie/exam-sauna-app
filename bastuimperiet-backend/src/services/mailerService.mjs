import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { formatDate, escapeHtml } from "../utils/formatters.js";
import { emailStyle, wrapEmail } from "../utils/emailTemplates.js";

async function sendMail({ to, subject, html, text }) {
    const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "eu-north-1";
    const fromEmail = process.env.SES_FROM_EMAIL || process.env.MAILERSEND_FROM_EMAIL;
    const fromName = process.env.SES_FROM_NAME || process.env.MAILERSEND_FROM_NAME || "Bastuimperiet";

    if (!fromEmail || !to) {
        throw new Error("Missing SES configuration");
    }

    const client = new SESClient({ region });
    const command = new SendEmailCommand({
        Source: fromName ? `${fromName} <${fromEmail}>` : fromEmail,
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Subject: {
                Data: subject,
                Charset: "UTF-8",
            },
            Body: {
                Html: {
                    Data: html,
                    Charset: "UTF-8",
                },
                Text: {
                    Data: text,
                    Charset: "UTF-8",
                },
            },
        },
    });

    try {
        await client.send(command);
    } catch (error) {
        console.error("SES send failed", {
            message: error?.message,
            name: error?.name,
            code: error?.code,
            to,
            fromEmail,
            region,
        });
        throw new Error(`SES error: ${error.message}`);
    }
}

export async function sendNewBookingRequestToAdmin({
    bookingId,
    name,
    email,
    phone,
    startDate,
    endDate,
    totalPrice,
    cleaning,
    firewood,
    scent,
    delivery,
    transportType,
}) {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
        throw new Error("Missing ADMIN_EMAIL configuration");
    }

    const subject = "Ny bokningsförfrågan!";
    const content = `
        <p>En ny bokningsförfrågan har kommit in via webbplatsen.</p>
        <div style="${emailStyle.detailsBox}">
            <p><strong>ID:</strong> ${escapeHtml(bookingId)}</p>
            <p><strong>Kund:</strong> ${escapeHtml(name)}</p>
            <p><strong>E-post:</strong> ${escapeHtml(email)}</p>
            <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Start:</strong> ${formatDate(startDate)}</p>
            <p><strong>Slut:</strong> ${formatDate(endDate)}</p>
            <p><strong>Doft:</strong> ${escapeHtml(scent)}</p>
            <p><strong>Tillval:</strong> Städ: ${cleaning ? "Ja" : "Nej"}, Ved: ${firewood}st, Utkörning: ${delivery ? "Ja" : "Nej"} ${delivery ? `(${escapeHtml(transportType)})` : ""}</p>
            <p style="font-size:18px;margin-top:10px;"><strong>Pris: ${escapeHtml(totalPrice)} kr</strong></p>
        </div>
        <a href="http://bastuimperiet-bucket.s3-website.eu-north-1.amazonaws.com/admin/bookings/${bookingId}" style="${emailStyle.button}">Hantera i Admin</a>
    `;

    const text = `Ny bokning från ${name}. ID: ${bookingId}. Period: ${startDate} - ${endDate}.`;
    await sendMail({ to: adminEmail, subject, html: wrapEmail(content, "Ny förfrågan"), text });
}

export async function sendBookingConfirmedToGuest({
    name,
    email,
    startDate,
    endDate,
    totalPrice,
    scent,
    cleaning,
    delivery,
    transportType,
    firewood,
}) {
    const subject = "Bokningsbekräftelse från Bastuimperiet";
    const content = `
        <p>Hej <strong>${escapeHtml(name)}</strong>!</p>
        <p>Vi har nu bekräftat din bokning. Vi ser fram emot att leverera en härlig bastuupplevelse!</p>
        
        <div style="${emailStyle.detailsBox}">
            <p><strong>Start:</strong> ${formatDate(startDate)}</p>
            <p><strong>Slut:</strong> ${formatDate(endDate)}</p>
            <div style="${emailStyle.divider}"></div>
            <p><strong>Doft:</strong> ${escapeHtml(scent)}</p>
            <p><strong>Städning:</strong> ${cleaning ? "Ja" : "Nej"}</p>
            <p><strong>Utkörning:</strong> ${delivery ? `Ja (${escapeHtml(transportType)})` : "Nej"}</p>
            <p><strong>Vedpåsar:</strong> ${escapeHtml(firewood)} st</p>
            <p style="font-size:18px;margin-top:10px;"><strong>Totalpris: ${escapeHtml(totalPrice)} kr</strong></p>
        </div>
        
        <p>Information om uthämtning och praktiska detaljer kommer skickas till dig inom kort. Har du frågor är det bara att svara på detta mejl.</p>
        <p>Varmt välkommen!</p>
    `;

    const text = `Hej ${name}! Din bokning är bekräftad. Från: ${startDate} kl 15:00. Till: ${endDate} kl 11:00. Dina tillval:  doft: ${scent}, Städ: ${cleaning ? "Ja" : "Nej"}, Utkörning: ${delivery ? `Ja, Transporttyp: ${transportType}` : "Nej"}, Vedpåsar: ${firewood}. Totalpris: ${totalPrice} kr.`;

    await sendMail({ to: email, subject, html: wrapEmail(content, "Bokning Bekräftad"), text });
}

export async function sendBookingDeclinedToGuest({ name, email, startDate, endDate }) {
    const subject = "Uppdatering om din bokningsförfrågan";
    const content = `
        <p>Hej ${escapeHtml(name)}!</p>
        <p>Tack för din förfrågan gällande perioden <strong>${formatDate(startDate)}</strong> till <strong>${formatDate(endDate)}</strong>.</p>
        <p>Vi kan tyvärr inte bekräfta din bokning just dessa datum då bastun är fullbokad eller under underhåll.</p>
        <p>Kontakta oss gärna via telefon eller genom att svara på detta mejl så kikar vi på ett annat datum som passar!</p>
    `;
    await sendMail({
        to: email,
        subject,
        html: wrapEmail(content, "Bokningsförfrågan"),
        text: `Tyvärr kunde vi inte bekräfta din bokning.`,
    });
}

export async function sendBookingCancelledToGuest({ name, email, startDate, endDate }) {
    const subject = "Din bokning har blivit avbokad";
    const content = `
        <p>Hej ${escapeHtml(name)}!</p>
        <p>Din bokning för perioden <strong>${formatDate(startDate)}</strong> till <strong>${formatDate(endDate)}</strong> har blivit avbokad.</p>
        <p>Kontakta oss om du har några frågor gällande din avbokning.</p>
    `;
    await sendMail({ to: email, subject, html: wrapEmail(content, "Avbokningsbekräftelse"), text: `Din bokning är nu avbokad.` });
}
