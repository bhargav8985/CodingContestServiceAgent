const axios = require('axios');

const fetchCpContests = async () => {
  try {
    const response = await axios.get('https://cp-api.vercel.app');

    const rawContests = response.data.contests;

    if (!Array.isArray(rawContests)) {
      console.error('⚠️ Unexpected CP API format:', response.data);
      return [];
    }

    // Format each contest into a uniform structure
    const formattedContests = rawContests.map(contest => ({
      platform: contest.platform || 'Unknown',
      name: contest.contestName,
      startTime: new Date(contest.startTime).toISOString(),
      startTimeUnix: new Date(contest.startTime).getTime() / 1000,
      duration: contest.contestDuration || '',
      url: contest.contestLink || ''
    }));

    return formattedContests;
  } catch (error) {
    console.error('❌ Error fetching CP contests:', error.message);
    return [];
  }
};

module.exports = fetchCpContests;
