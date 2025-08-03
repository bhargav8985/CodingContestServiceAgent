require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const cron = require('node-cron');

const fetchCpContests = require('../services/fetchCpContests');
const fetchLeetCodeContests = require('../services/fetchLeetCode');
const { formatContests } = require('../services/geminiService');
const { generatePdf } = require('../services/Pdfgenerator');
const sendEmail = require('../services/emailService');
const User = require('../models/User');

console.log('Connecting to MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    cron.schedule('* * * * *', async () => {
      try {
        console.log('⏰ Running cron job...');

        const users = await User.find({ notificationsEnabled: true });

        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        const cpContests = await fetchCpContests();
        const leetCodeContests = await fetchLeetCodeContests();

        const allContests = [
          ...(Array.isArray(cpContests) ? cpContests : []),
          ...(Array.isArray(leetCodeContests) ? leetCodeContests : [])
        ];

        for (const user of users) {
          // ✅ Check if user should be notified now and hasn’t been already today
          const alreadyNotifiedToday = user.lastNotified?.toDateString() === now.toDateString();
          if (user.notificationTime !== currentTime || alreadyNotifiedToday) continue;

          const filteredContests = allContests.filter(contest =>
            user.platforms.includes(contest.platform) &&
            new Date(contest.startTime) > now &&
            (user.minRating ? contest.rating >= user.minRating : true)
          );

          console.log(`User: ${user.email}, Filtered Contests: ${filteredContests.length}`);

          if (filteredContests.length > 0) {
            const htmlContent = await formatContests(filteredContests);
            const pdfPath = await generatePdf(htmlContent, `ContestSummary-${user._id}.pdf`);
            await sendEmail(user.email, 'Upcoming Coding Contests', htmlContent, pdfPath);

            // ✅ Update lastNotified so we don’t email again today
            user.lastNotified = now;
            await user.save();

            console.log(`📧 Email sent to ${user.email}`);
          }
        }
      } catch (err) {
        console.error('❌ Cron error:', err);
      }
    });

  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  });
