export const emailStyle = {
    body: "margin:0;padding:0;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;background-color:#f4f4f4;",
    container:
        "max-width:600px;margin:20px auto;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);",
    header: "background-color:#632B2B;padding:30px;text-align:center;color:#ffffff;",
    content: "padding:30px;line-height:1.6;color:#333333;",
    footer: "padding:20px;text-align:center;font-size:12px;color:#888888;background-color:#f9f9f9;",
    button: "display:inline-block;padding:14px 28px;background-color:#f0c05a;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:bold;margin-top:20px;",
    divider: "border-bottom:1px solid #eeeeee;margin:20px 0;",
    detailsBox: "background-color:#fdfaf2;padding:20px;border-radius:8px;border:1px dashed #d0a040;margin:20px 0;",
};

export function wrapEmail(content, title) {
    return `
        <html>
            <body style="${emailStyle.body}">
                <div style="${emailStyle.container}">
                    <div style="${emailStyle.header}">
                        <h1 style="margin:0;font-size:24px;letter-spacing:2px;font-weight:bold;">BASTUIMPERIET</h1>
                    </div>
                    <div style="${emailStyle.content}">
                        <h2 style="margin-top:0;color:#632B2B;border-bottom:2px solid #f0c05a;display:inline-block;padding-bottom:5px;">${title}</h2>
                        <div style="margin-top:20px;">
                            ${content}
                        </div>
                    </div>
                    <div style="${emailStyle.footer}">
                        <p style="margin:0;">&copy; ${new Date().getFullYear()} Bastuimperiet. Alla rättigheter förbehållna.</p>
                    </div>
                </div>
            </body>
        </html>
    `;
}
