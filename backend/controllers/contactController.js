const nodemailer = require('nodemailer');
const ContactMessage = require('../models/ContactMessage');

/**
 * Creates and configures the Nodemailer transporter.
 * Returns null if credentials are empty or placeholder values.
 */
const createTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (
    !user || 
    !pass || 
    user === 'your_email@gmail.com' || 
    pass === 'your_gmail_app_password' || 
    pass === 'your_16_character_gmail_app_password' ||
    pass.trim().length === 0
  ) {
    return null; // Email credentials are placeholder / not yet configured
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user.trim(),
      pass: pass.trim().replace(/\s+/g, '') // remove spaces often copied from Google App Password UI
    }
  });
};

/**
 * Handle POST /api/contact
 * Sends an email notification to Shubham Bhavar and saves the record in MongoDB.
 */
exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Validation check
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Please enter your full name.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Please enter your email address.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }
    if (!subject || !subject.trim()) {
      return res.status(400).json({ success: false, message: 'Please enter a subject for your message.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Please enter your message.' });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();
    const recipientEmail = process.env.RECEIVER_EMAIL || 'shubhambhavar2821@gmail.com';

    let emailStatus = 'SENT';
    let emailSentSuccessfully = false;

    // 2. Transporter and Nodemailer dispatch
    const transporter = createTransporter();

    if (transporter) {
      // HTML email template with modern dark/cyan portfolio branding
      const htmlContent = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0d1117; color: #c9d1d9; border: 1px solid #30363d; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <div style="background: linear-gradient(135deg, #00f0ff 0%, #7928ca 100%); padding: 24px 20px; text-align: center;">
            <h1 style="color: #0b0f19; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">✨ New Portfolio Contact Message</h1>
            <p style="color: #1a1e36; margin: 6px 0 0 0; font-size: 14px; font-weight: 600;">Message from Shubham Bhavar's Portfolio Website</p>
          </div>
          
          <div style="padding: 24px 20px;">
            <div style="background-color: #161b22; border-left: 4px solid #00f0ff; padding: 14px 16px; border-radius: 6px; margin-bottom: 20px;">
              <p style="margin: 0 0 6px 0; font-size: 14px; color: #8b949e;"><strong>Sender Name:</strong> <span style="color: #f0f6fc; font-size: 15px;">${trimmedName}</span></p>
              <p style="margin: 0 0 6px 0; font-size: 14px; color: #8b949e;"><strong>Sender Email:</strong> <a href="mailto:${trimmedEmail}" style="color: #58a6ff; text-decoration: none;">${trimmedEmail}</a></p>
              <p style="margin: 0; font-size: 14px; color: #8b949e;"><strong>Subject:</strong> <span style="color: #58a6ff;">${trimmedSubject}</span></p>
            </div>

            <div style="background-color: #161b22; padding: 18px; border-radius: 8px; border: 1px solid #30363d;">
              <h3 style="margin-top: 0; font-size: 15px; color: #00f0ff; text-transform: uppercase; letter-spacing: 1px;">Message Content:</h3>
              <p style="color: #f0f6fc; font-size: 15px; line-height: 1.6; white-space: pre-wrap; margin-bottom: 0;">${trimmedMessage}</p>
            </div>

            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${trimmedEmail}?subject=Re: ${encodeURIComponent(trimmedSubject)}" style="display: inline-block; background: linear-gradient(135deg, #00f0ff 0%, #7928ca 100%); color: #0b0f19; padding: 12px 28px; border-radius: 30px; font-weight: 700; text-decoration: none; font-size: 14px;">Reply to ${trimmedName}</a>
            </div>
          </div>

          <div style="background-color: #0b0e14; padding: 16px; text-align: center; border-top: 1px solid #21262d; font-size: 12px; color: #8b949e;">
            <p style="margin: 0;">Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
            <p style="margin: 4px 0 0 0;">Shubham Bhavar Portfolio • Pune, Maharashtra, India</p>
          </div>
        </div>
      `;

      const mailOptions = {
        from: `"${trimmedName} (via Portfolio)" <${process.env.EMAIL_USER}>`,
        to: recipientEmail,
        replyTo: trimmedEmail,
        subject: `[Portfolio Contact] ${trimmedSubject} - from ${trimmedName}`,
        text: `You have received a new contact message from your portfolio:\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\nSubject: ${trimmedSubject}\n\nMessage:\n${trimmedMessage}`,
        html: htmlContent
      };

      try {
        await transporter.sendMail(mailOptions);
        emailSentSuccessfully = true;
        console.log(`[Email Sent] Message from ${trimmedEmail} sent to ${recipientEmail}`);
      } catch (mailErr) {
        emailStatus = 'FAILED';
        console.error('[Nodemailer Error]:', mailErr.message);
      }
    } else {
      emailStatus = 'DEV_MOCK_SAVED';
      console.log(`[Dev Notice] EMAIL_PASS is a placeholder in .env. Message recorded to MongoDB/Console.`);
    }

    // 3. Save to MongoDB
    try {
      if (ContactMessage.db && ContactMessage.db.readyState === 1) {
        await ContactMessage.create({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
          emailSentStatus: emailStatus,
          ipAddress: req.ip || req.headers['x-forwarded-for'] || ''
        });
        console.log(`[MongoDB] Contact message saved successfully.`);
      }
    } catch (dbErr) {
      console.warn(`[MongoDB Warning] Could not persist message to database:`, dbErr.message);
    }

    // 4. Return response to frontend
    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received successfully. Shubham will get back to you soon.',
      details: {
        name: trimmedName,
        email: trimmedEmail,
        emailStatus: emailStatus,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('[Contact Controller Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your message. Please try again later or reach out directly on WhatsApp/Email.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
