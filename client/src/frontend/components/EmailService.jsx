export const sendDailyEmail = (userEmail, contests) => {
  console.log(`Sending email to ${userEmail} at selected time...`);
  console.log("Contests included:", contests);
  // In a real app, this would use Nodemailer/SendGrid/etc.
};
