import { createServerFn } from "@tanstack/react-start";

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      console.error("Missing credentials");
      throw new Error("Server configuration error");
    }

    try {
      // Use eval to hide the require from Vite's static analysis
      // This prevents the bundler from trying to resolve nodemailer on the client
      const nodemailer = eval('require("nodemailer")');

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user, pass },
      });

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
      console.error("Handler error:", error);
      throw error;
    }
  });
