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
const ADMIN_RECIPIENTS = "ravishangar130@gmail.com, beehivecarrybee@gmail.com";

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

    try {
      await transporter.sendMail({
        from: `"Sanctus Property Website" <${user}>`,
        to: ADMIN_RECIPIENTS,
        replyTo: data.email,
        subject: `New Enquiry: ${data.name}`,
        text: [
          "New enquiry received from the website:",
          "",
          `Name:          ${data.name}`,
          `Email:         ${data.email}`,
          `Phone:         ${data.phone}`,
          `Property Type: ${data.propertyType || "—"}`,
          `Budget:        ${data.budget || "—"}`,
          "",
          "Message / Requirement:",
          data.message || "—",
        ].join("\n"),
      });

      return { success: true };
    } catch (error) {
      console.error("Enquiry email failed:", error);
      throw new Error("Failed to send enquiry. Please try again later.");
    }
  });
