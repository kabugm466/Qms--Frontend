const nodemailer = require('nodemailer');

// Single shared transporter, built lazily so a missing/incomplete SMTP
// config doesn't crash the whole server at boot — it only fails when an
// email is actually sent.
let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

/**
 * Send an email. Callers pass a rendered subject/html (see utils/emailTemplates.js).
 * Errors are logged but not re-thrown by default so a flaky SMTP provider
 * can't block core flows like registration; pass `required: true` for
 * emails that must succeed (e.g. nothing today needs this, but it's there).
 */
async function sendEmail({ to, subject, html, required = false }) {
  try {
    const info = await getTransporter().sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });
    return info;
  } catch (err) {
    console.error('[email] Failed to send email to', to, '-', err.message);
    if (required) throw err;
    return null;
  }
}

module.exports = { getTransporter, sendEmail };
