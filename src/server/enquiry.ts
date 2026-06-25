import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";

export type EnquiryData = {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  budget: string;
  message: string;
};

// This function runs only on the server
export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((data: EnquiryData) => data)
  .handler(async ({ data }) => {
    const { name, email, phone, propertyType, budget, message } = data;

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables");
      throw new Error("Email service is not configured");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    // 1. Send Alert to Admin
    const adminMailOptions = {
      from: `"Sanctus Property Automation" <${user}>`,
      to: "ravishangar130@gmail.com, beehivecarrybee@gmail.com",
      subject: `New Enquiry Alert: ${name}`,
      text: `
        New Enquiry Details:
        -------------------
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Property Type: ${propertyType || "Not specified"}
        Budget: ${budget || "Not specified"}
        
        Message:
        ${message || "No message provided"}
      `,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #C9883A;">New Enquiry Received</h2>
          <p><strong>Customer Details:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Property Type:</strong> ${propertyType || "Not specified"}</li>
            <li><strong>Budget:</strong> ${budget || "Not specified"}</li>
          </ul>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 4px solid #C9883A; padding-left: 15px; margin: 20px 0;">
            ${message || "No message provided"}
          </blockquote>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 12px; color: #999;">Automated notification from Sanctus Property Portfolio.</p>
        </div>
      `,
    };

    // 2. Send Thank You to Customer
    const customerMailOptions = {
      from: `"Sanctus Property" <${user}>`,
      to: email,
      subject: `Thank you for your enquiry, ${name}`,
      text: `
        Dear ${name},
        
        Thank you for reaching out to Sanctus Property. We have received your enquiry regarding ${propertyType || "your project"}.
        
        Our team will review the details and get back to you within one business day.
        
        Best regards,
        The Sanctus Property Team
      `,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 30px; border-radius: 10px;">
          <h2 style="color: #C9883A; margin-top: 0;">Thank you for reaching out</h2>
          <p>Dear ${name},</p>
          <p>We have successfully received your enquiry regarding <strong>${propertyType || "your project"}</strong>.</p>
          <p>Our team at <strong>Sanctus Property</strong> is currently reviewing your request. We understand the importance of your project and will get back to you within one business day to discuss the next steps.</p>
          <div style="background: #fdfaf6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px;"><strong>Your Enquiry Summary:</strong></p>
            <p style="margin: 5px 0; font-size: 14px; color: #666;">Type: ${propertyType || "Not specified"}</p>
            <p style="margin: 5px 0; font-size: 14px; color: #666;">Budget: ${budget || "Not specified"}</p>
          </div>
          <p>Best regards,<br /><strong>The Sanctus Property Team</strong></p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 11px; color: #999; text-align: center;">This is an automated confirmation of your enquiry at sanctus-property.vercel.app</p>
        </div>
      `,
    };

    try {
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(customerMailOptions),
      ]);
      return { success: true };
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send enquiry emails");
    }
  });
