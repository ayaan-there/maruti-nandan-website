const nodemailer = require('nodemailer');

/**
 * Serverless Email Function for Vercel
 * Sends contact form submissions to the business email
 * 
 * Environment Variables Required:
 * - GMAIL_USER: Gmail address for sending emails
 * - GMAIL_PASSWORD: Gmail app-specific password
 * - BUSINESS_EMAIL: Business email to receive inquiries
 */

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

/**
 * Handler function for email sending
 * POST /api/sendMail
 * 
 * Body:
 * {
 *   name: string (required),
 *   email: string (required),
 *   phone: string (optional),
 *   message: string (required)
 * }
 */
export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields: name, email, message' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Email to be sent to business
    const businessMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.BUSINESS_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: white; padding: 20px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0C345A;">New Inquiry from Maruti Nandan Website</h2>
            
            <div style="border-top: 2px solid #BB7E5D; padding-top: 20px; margin-top: 20px;">
              <p><strong>Name:</strong> ${sanitizeHtml(name)}</p>
              <p><strong>Email:</strong> <a href="mailto:${sanitizeHtml(email)}">${sanitizeHtml(email)}</a></p>
              ${phone ? `<p><strong>Phone:</strong> ${sanitizeHtml(phone)}</p>` : ''}
              
              <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #BB7E5D; margin: 20px 0;">
                <strong>Message:</strong>
                <p style="white-space: pre-wrap; color: #333;">${sanitizeHtml(message)}</p>
              </div>
            </div>
            
            <p style="color: #666; font-size: 12px; margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">
              This email was generated from a contact form submission on your website.
            </p>
          </div>
        </div>
      `,
      replyTo: email
    };

    // Confirmation email to be sent to user
    const userMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'We have received your message - Maruti Nandan Marmo & Grani',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: white; padding: 20px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0C345A;">Thank You, ${sanitizeHtml(name)}!</h2>
            
            <p style="color: #333; line-height: 1.6;">
              Thank you for reaching out to <strong>Maruti Nandan Marmo & Grani</strong>. We have received your message and appreciate your interest in our premium marble and granite tiles.
            </p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #BB7E5D; margin: 20px 0;">
              <p style="margin: 0; color: #666;">
                <strong>We will get back to you shortly at:</strong><br>
                Email: ${sanitizeHtml(email)}<br>
                ${phone ? `Phone: ${sanitizeHtml(phone)}<br>` : ''}
              </p>
            </div>
            
            <p style="color: #333; line-height: 1.6;">
              In the meantime, feel free to connect with us on WhatsApp for quick inquiries:
            </p>
            
            <p style="text-align: center; margin: 20px 0;">
              <a href="https://wa.me/919414173630" style="background-color: #25D366; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
                Chat on WhatsApp
              </a>
            </p>
            
            <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #0C345A;"><strong>Maruti Nandan Marmo & Grani Pvt. Ltd.</strong></p>
              <p style="margin: 5px 0; color: #666;">NH-8 Nijarna Road, Kelwa, Rajsamand, Rajasthan</p>
              <p style="margin: 5px 0; color: #666;">Phone: +91 9414173630 / +91 8619643199</p>
              <p style="margin: 5px 0; color: #666;">Quality tiles for your dream space</p>
            </div>
            
            <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
              © 2025 Maruti Nandan Marmo & Grani. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(businessMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

/**
 * Simple HTML sanitization function
 * Prevents XSS attacks by escaping HTML special characters
 */
function sanitizeHtml(str) {
  if (!str) return '';
  const htmlEscapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return str.replace(/[&<>"']/g, (char) => htmlEscapeMap[char]);
}
