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

    const subject = "Ny bokningsförfrågan";
    const html = `
        <h2>Ny bokningsförfrågan</h2>
        <p><strong>Boknings-id:</strong> ${escapeHtml(bookingId)}</p>
        <p><strong>Namn:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-post:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Från:</strong> ${escapeHtml(startDate)}</p>
        <p><strong>Till:</strong> ${escapeHtml(endDate)}</p>
        <p><strong>Doft:</strong> ${escapeHtml(scent)}</p>
        <p><strong>Städ:</strong> ${cleaning ? "Ja" : "Nej"}</p>
        <p><strong>Utkörning:</strong> ${delivery ? "Ja" : "Nej"}</p>
        ${delivery ? `<p><strong>Transporttyp:</strong> ${escapeHtml(transportType)}</p>` : ""}
        <p><strong>Vedpåsar:</strong> ${escapeHtml(firewood)}</p>
        <p><strong>Pris:</strong> ${escapeHtml(totalPrice)} kr</p>
    `;

    const text = `Ny bokningsförfrågan\nID: ${bookingId}\nNamn: ${name}\nE-post: ${email}\nTelefon: ${phone}\nFrån: ${startDate}\nTill: ${endDate}\nDoft: ${scent}\nStäd: ${cleaning ? "Ja" : "Nej"}\nUtkörning: ${delivery ? "Ja" : "Nej"}\n${delivery ? `Transporttyp: ${transportType}\n` : ""}Vedpåsar: ${firewood}\nPris: ${totalPrice} kr`;

    await sendMail({ to: adminEmail, subject, html, text });
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
    const subject = "Din bokning hos Bastuimperiet är bekräftad";
    const html = `
        <h2>Bokning bekräftad</h2>
        <p>Hej ${escapeHtml(name)}!</p>
        <p>Din bokning är nu bekräftad.</p>
        <p><strong>Från:</strong> ${escapeHtml(startDate)}</p>
        <p><strong>Till:</strong> ${escapeHtml(endDate)}</p>
         <p><strong>Doft:</strong> ${escapeHtml(scent)}</p>
        <p><strong>Städ:</strong> ${cleaning ? "Ja" : "Nej"}</p>
        <p><strong>Utkörning:</strong> ${delivery ? "Ja" : "Nej"}</p>
        ${delivery ? `<p><strong>Transporttyp:</strong> ${escapeHtml(transportType)}</p>` : ""}
        <p><strong>Vedpåsar:</strong> ${escapeHtml(firewood)}</p>
        <p><strong>Totalpris:</strong> ${escapeHtml(totalPrice)} kr</p>
        <p>Varmt välkommen!</p>
    `;

    const text = `Hej ${name}! Din bokning är bekräftad. Från: ${startDate}. Till: ${endDate}. Dina tillval:  doft: ${scent}, Städ: ${cleaning ? "Ja" : "Nej"}, Utkörning: ${delivery ? `Ja, Transporttyp: ${transportType}` : "Nej"}, Vedpåsar: ${firewood}. Totalpris: ${totalPrice} kr.`;

    await sendMail({ to: email, subject, html, text });
}

export async function sendBookingDeclinedToGuest({ name, email, startDate, endDate }) {
    const subject = "Uppdatering om din bokningsförfrågan";
    const html = `
        <h2>Bokningsförfrågan kunde inte bekräftas</h2>
        <p>Hej ${escapeHtml(name)}!</p>
        <p>Vi kan tyvärr inte bekräfta din bokning för dessa datum just nu.</p>
        <p><strong>Från:</strong> ${escapeHtml(startDate)}</p>
        <p><strong>Till:</strong> ${escapeHtml(endDate)}</p>
        <p>Kontakta oss gärna om du vill ha hjälp att hitta ett alternativt datum.</p>
    `;

    const text = `Hej ${name}! Vi kan tyvärr inte bekräfta din bokning för perioden ${startDate} till ${endDate}. Kontakta oss gärna för alternativa datum.`;

    await sendMail({ to: email, subject, html, text });
}

export async function sendBookingCancelledToGuest({ name, email, startDate, endDate }) {
    const subject = "Din bokning hos Bastuimperiet har avbokats";
    const html = `
        <h2>Bokning avbokad</h2>
        <p>Hej ${escapeHtml(name)}!</p>
        <p>Din bokning för perioden ${escapeHtml(startDate)} till ${escapeHtml(endDate)} har avbokats.</p>
        <p>Kontakta oss gärna om du har några frågor.</p>
    `;

    const text = `Hej ${name}! Din bokning för perioden ${startDate} till ${endDate} har avbokats. Kontakta oss gärna om du har några frågor.`;

    await sendMail({ to: email, subject, html, text });
}
