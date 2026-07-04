import { createServerFn } from "@tanstack/react-start";

export type EnquiryData = {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  budget: string;
  message: string;
};

// Where enquiry notifications are delivered.
const ADMIN_RECIPIENTS = "sanctuspropertyopc@gmail.com";

// Server function invoked directly from the client:
//   await submitEnquiry({ data: form })
// The .handler body runs server-only, so the nodemailer import below is
// tree-shaken out of the client bundle. Requires a Node runtime to send
// (Gmail SMTP over nodemailer does not run on edge runtimes).
export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: EnquiryData) => data)
  .handler(async ({ data }) => {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      throw new Error("Email service is not configured");
    }

    // Dynamic import keeps nodemailer out of the client bundle.
    const { default: nodemailer } = await import("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    // Escape user input before embedding in the HTML email.
    const esc = (s: string) =>
      String(s ?? "").replace(/[&<>"']/g, (c) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!),
      );

    const receivedAt =
      new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      }).format(new Date()) + " IST";

    const row = (label: string, value: string, href?: string) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f0ebe1;width:140px;font-size:12px;letter-spacing:.4px;color:#8a8175;vertical-align:top;font-family:Arial,Helvetica,sans-serif;">${label}</td>
        <td style="padding:12px 0;border-bottom:1px solid #f0ebe1;font-size:15px;color:#1f1b16;font-weight:600;font-family:Arial,Helvetica,sans-serif;">${
          href ? `<a href="${href}" style="color:#1f1b16;text-decoration:none;">${value}</a>` : value
        }</td>
      </tr>`;

    const html = `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f2eee6;-webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2eee6;">
      <tr>
        <td align="center" style="padding:32px 14px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border:1px solid #ece6da;border-radius:16px;overflow:hidden;">
            <!-- gold accent -->
            <tr><td style="height:5px;line-height:5px;font-size:0;background:#C9883A;background:linear-gradient(90deg,#C9883A,#E8B06E,#C9883A);">&nbsp;</td></tr>
            <!-- header -->
            <tr>
              <td style="background:#17130F;padding:36px 42px;">
                <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C9883A;font-weight:bold;font-family:Arial,Helvetica,sans-serif;">Sanctus Property</div>
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:27px;line-height:1.25;color:#ffffff;margin-top:12px;">New Enquiry Received</div>
                <div style="font-size:13px;color:#a59c8c;margin-top:8px;font-family:Arial,Helvetica,sans-serif;">A new lead just submitted the website enquiry form.</div>
              </td>
            </tr>
            <!-- details -->
            <tr>
              <td style="padding:30px 42px 6px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row("Full Name", esc(data.name))}
                  ${row("Email", esc(data.email), `mailto:${esc(data.email)}`)}
                  ${row("Phone", esc(data.phone), `tel:${esc(data.phone).replace(/[^0-9+]/g, "")}`)}
                  ${row("Property Type", data.propertyType ? esc(data.propertyType) : "—")}
                  ${row("Budget Range", data.budget ? esc(data.budget) : "—")}
                </table>
              </td>
            </tr>
            <!-- message -->
            <tr>
              <td style="padding:18px 42px 8px;">
                <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8175;margin-bottom:10px;font-family:Arial,Helvetica,sans-serif;">Message / Requirement</div>
                <div style="background:#faf7f1;border-left:3px solid #C9883A;border-radius:10px;padding:16px 18px;font-size:15px;line-height:1.65;color:#2e2a24;font-family:Arial,Helvetica,sans-serif;">${
                  data.message ? esc(data.message).replace(/\n/g, "<br>") : "—"
                }</div>
              </td>
            </tr>
            <!-- reply button -->
            <tr>
              <td style="padding:22px 42px 38px;">
                <a href="mailto:${esc(data.email)}?subject=Re:%20Your%20enquiry%20with%20Sanctus%20Property" style="display:inline-block;background:#17130F;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;padding:13px 30px;border-radius:999px;font-family:Arial,Helvetica,sans-serif;">Reply to ${esc(data.name)} &rarr;</a>
              </td>
            </tr>
            <!-- footer -->
            <tr>
              <td style="background:#faf7f1;border-top:1px solid #ece6da;padding:20px 42px;font-size:12px;line-height:1.6;color:#9a9183;font-family:Arial,Helvetica,sans-serif;">
                Received ${receivedAt}<br>Automated notification &middot; Sanctus Property
              </td>
            </tr>
          </table>
          <div style="font-size:11px;color:#b3ab9c;margin-top:18px;font-family:Arial,Helvetica,sans-serif;">You are receiving this because you are an administrator of sanctusproperty.</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    try {
      await transporter.sendMail({
        from: `"Sanctus Property Website" <${user}>`,
        to: ADMIN_RECIPIENTS,
        replyTo: data.email,
        subject: `New Enquiry — ${data.name}`,
        text: [
          "New enquiry received from the website",
          "",
          `Name:          ${data.name}`,
          `Email:         ${data.email}`,
          `Phone:         ${data.phone}`,
          `Property Type: ${data.propertyType || "—"}`,
          `Budget:        ${data.budget || "—"}`,
          "",
          "Message / Requirement:",
          data.message || "—",
          "",
          `Received ${receivedAt}`,
        ].join("\n"),
        html,
      });

      return { success: true };
    } catch (error) {
      console.error("Enquiry email failed:", error);
      throw new Error("Failed to send enquiry. Please try again later.");
    }
  });
