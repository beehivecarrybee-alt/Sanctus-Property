import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, propertyType, budget, message } = req.body;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return res.status(500).json({ error: "Email service not configured" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await Promise.all([
      transporter.sendMail({
        from: `"Sanctus Property Automation" <${user}>`,
        to: "ravishangar130@gmail.com, beehivecarrybee@gmail.com",
        subject: `New Enquiry Alert: ${name}`,
        text: `New enquiry details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nProperty: ${propertyType}\nBudget: ${budget}\nMessage: ${message}`,
      }),
      transporter.sendMail({
        from: `"Sanctus Property" <${user}>`,
        to: email,
        subject: `Thank you for your enquiry, ${name}`,
        text: `Dear ${name},\n\nThank you for reaching out. We have received your enquiry and will get back to you soon.`,
      }),
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
