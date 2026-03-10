import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

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
    guestName,
    email,
    phone,
    startDate,
    endDate,
    totalPrice,
    cleaning,
    firewood,
}) {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
        throw new Error("Missing ADMIN_EMAIL configuration");
    }

    const subject = "Ny bokningsförfrågan";
    const html = `
        <h2>Ny bokningsförfrågan</h2>
        <p><strong>Boknings-id:</strong> ${escapeHtml(bookingId)}</p>
        <p><strong>Namn:</strong> ${escapeHtml(guestName)}</p>
        <p><strong>E-post:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Från:</strong> ${escapeHtml(startDate)}</p>
        <p><strong>Till:</strong> ${escapeHtml(endDate)}</p>
        <p><strong>Städ:</strong> ${cleaning ? "Ja" : "Nej"}</p>
        <p><strong>Vedpåsar:</strong> ${escapeHtml(firewood)}</p>
        <p><strong>Pris:</strong> ${escapeHtml(totalPrice)} kr</p>
    `;

    const text = `Ny bokningsförfrågan\nID: ${bookingId}\nNamn: ${guestName}\nE-post: ${email}\nTelefon: ${phone}\nFrån: ${startDate}\nTill: ${endDate}\nStäd: ${cleaning ? "Ja" : "Nej"}\nVedpåsar: ${firewood}\nPris: ${totalPrice} kr`;

    await sendMail({ to: adminEmail, subject, html, text });
}

export async function sendBookingConfirmedToGuest({ guestName, email, startDate, endDate, totalPrice }) {
    const subject = "Din bokning hos Bastuimperiet är bekräftad";
    const html = `
        <h2>Bokning bekräftad</h2>
        <p>Hej ${escapeHtml(guestName)}!</p>
        <p>Din bokning är nu bekräftad.</p>
        <p><strong>Från:</strong> ${escapeHtml(startDate)}</p>
        <p><strong>Till:</strong> ${escapeHtml(endDate)}</p>
        <p><strong>Totalpris:</strong> ${escapeHtml(totalPrice)} kr</p>
        <p>Varmt välkommen!</p>
    `;

    const text = `Hej ${guestName}! Din bokning är bekräftad. Från: ${startDate}. Till: ${endDate}. Totalpris: ${totalPrice} kr.`;

    await sendMail({ to: email, subject, html, text });
}

export async function sendBookingDeclinedToGuest({ guestName, email, startDate, endDate }) {
    const subject = "Uppdatering om din bokningsförfrågan";
    const html = `
        <h2>Bokningsförfrågan kunde inte bekräftas</h2>
        <p>Hej ${escapeHtml(guestName)}!</p>
        <p>Vi kan tyvärr inte bekräfta din bokning för dessa datum just nu.</p>
        <p><strong>Från:</strong> ${escapeHtml(startDate)}</p>
        <p><strong>Till:</strong> ${escapeHtml(endDate)}</p>
        <p>Kontakta oss gärna om du vill ha hjälp att hitta ett alternativt datum.</p>
    `;

    const text = `Hej ${guestName}! Vi kan tyvärr inte bekräfta din bokning för perioden ${startDate} till ${endDate}. Kontakta oss gärna för alternativa datum.`;

    await sendMail({ to: email, subject, html, text });
}

export async function sendBookingCancelledToGuest({ guestName, email, startDate, endDate }) {
    const subject = "Din bokning hos Bastuimperiet har avbokats";
    const html = `
        <h2>Bokning avbokad</h2>
        <p>Hej ${escapeHtml(guestName)}!</p>
        <p>Din bokning för perioden ${escapeHtml(startDate)} till ${escapeHtml(endDate)} har avbokats.</p>
        <p>Kontakta oss gärna om du har några frågor.</p>
    `;

    const text = `Hej ${guestName}! Din bokning för perioden ${startDate} till ${endDate} har avbokats. Kontakta oss gärna om du har några frågor.`;

    await sendMail({ to: email, subject, html, text });
}
