import { eventHandler, readBody } from "h3";
import nodemailer from "nodemailer";

export default eventHandler(async (event) => {
  const data = (await readBody(event)) as any;
  const { name, email, phone, propertyType, budget, message } = data;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.error("CRITICAL: GMAIL_USER or GMAIL_APP_PASSWORD is not defined in environment variables.");
    return { 
      success: false, 
      error: "server_config_missing",
      message: "Server is not configured to send emails. Please add environment variables." 
    };
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use SSL
    auth: { user, pass },
  });

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

  return { success: true };
});
