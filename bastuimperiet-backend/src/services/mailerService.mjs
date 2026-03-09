function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

async function sendMail({ to, subject, html, text }) {
    const apiKey = process.env.MAILERSEND_API_KEY;
    const fromEmail = process.env.MAILERSEND_FROM_EMAIL;
    const fromName = process.env.MAILERSEND_FROM_NAME || "Bastuimperiet";

    if (!apiKey || !fromEmail || !to) {
        throw new Error("Missing MailerSend configuration");
    }

    const response = await fetch("https://api.mailersend.com/v1/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            from: {
                email: fromEmail,
                name: fromName,
            },
            to: [{ email: to }],
            subject,
            html,
            text,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`MailerSend error (${response.status}): ${errorBody}`);
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
