const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

const sendEmail = async (to, subject, htmlContent, attachmentPath) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    html: htmlContent,
    text: 'Please find the attached PDF summary of upcoming coding contests.',
    attachments: [
      {
        filename: 'ContestSummary.pdf',
        path: attachmentPath
      }
    ]
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
