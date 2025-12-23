// src/app/api/careers/route.ts
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, resume, resumeName } = await req.json();

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !message?.trim() ||
      !resume
    ) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid input" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Configure SMTP transport for Zoho
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.zoho.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    // Send to HR email from env or fallback
    const to = process.env.HR_EMAIL || "hr@lapizblue.com";

    const subject = `New Career Application from ${name}`;
    const text =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n\n` +
      `Message:\n${message}\n\n` +
      `Resume: ${resumeName}`;

    // Extract base64 data and mime type
    const matches = resume.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid file format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Lapiz Blue Careers" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      replyTo: email,
      attachments: [
        {
          filename: resumeName,
          content: base64Data,
          encoding: "base64",
          contentType: mimeType,
        },
      ],
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("CAREERS API ERROR:", err);
    return new Response(JSON.stringify({ ok: false, error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
