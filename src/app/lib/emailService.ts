import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  try {
    await resend.emails.send({
      from: "Monochrome <iyohajessy@gmail.com>",
      to: email,
      subject: "Verify Your Email",
      html: `
        <h1>Email Verification</h1>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send verification email", error);
    throw new Error("Failed to send verification email");
  }
}
