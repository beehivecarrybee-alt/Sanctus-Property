"use server";

import { createServerFn } from "@tanstack/react-start";

export type EnquiryData = {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  budget: string;
  message: string;
};

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((data: EnquiryData) => data)
  .handler(async ({ data }) => {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      throw new Error("Email service is not configured");
    }

    // Dynamic import inside handler to avoid client bundling
    const { default: nodemailer } = await import("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    try {
      await Promise.all([
        transporter.sendMail({
          from: `"Sanctus Property Automation" <${user}>`,
          to: "ravishangar130@gmail.com, beehivecarrybee@gmail.com",
          subject: `New Enquiry Alert: ${data.name}`,
          text: `New enquiry details:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nProperty: ${data.propertyType}\nBudget: ${data.budget}\nMessage: ${data.message}`,
        }),
        transporter.sendMail({
          from: `"Sanctus Property" <${user}>`,
          to: data.email,
          subject: `Thank you for your enquiry, ${data.name}`,
          text: `Dear ${data.name},\n\nThank you for reaching out. We have received your enquiry and will get back to you soon.`,
        }),
      ]);

      return { success: true };
    } catch (error) {
      console.error("Email failed:", error);
      throw new Error("Failed to send email");
    }
  });
