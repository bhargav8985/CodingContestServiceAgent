import React, { useState } from 'react';
import { FaEnvelope, FaBell, FaCheckCircle, FaClock } from 'react-icons/fa';

export const EmailPreferences = ({ user }) => {
  const [time, setTime] = useState('08:00');
  const [platforms, setPlatforms] = useState(['LeetCode', 'Codeforces']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePlatform = (platform) => {
    setPlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) return alert("User not found");
    setIsSubmitting(true);

    try {
      const res = await fetch(`http://localhost:5000/api/user/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platforms, notificationTime: time })
      });

      if (res.ok) {
        alert('Preferences saved successfully!');
      } else {
        const msg = await res.text();
        alert(`Failed: ${msg}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error saving preferences');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto border border-gray-100">
      <div className="flex items-center mb-6">
        <FaEnvelope className="text-indigo-500 text-2xl mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Email Preferences</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FaClock className="mr-2 text-gray-500" />
            Daily Digest Time
          </label>
          <div className="relative">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full py-3 px-4 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition duration-200"
              required
            />
            <FaClock className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <FaBell className="mr-2 text-gray-500" />
            Platform Notifications
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['LeetCode', 'Codeforces', 'AtCoder', 'HackerRank'].map((platform) => (
              <button
                key={platform}
                type="button"
                onClick={() => togglePlatform(platform)}
                className={`px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                  platforms.includes(platform)
                    ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className={`font-medium ${platforms.includes(platform) ? 'text-indigo-700' : 'text-gray-700'}`}>
                  {platform}
                </span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  platforms.includes(platform) ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'
                }`}>
                  {platforms.includes(platform) && <FaCheckCircle className="w-3 h-3 text-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            <span className="flex items-center">
              <FaCheckCircle className="mr-2" />
              Save Preferences
            </span>
          )}
        </button>
      </form>
    </div>
  );
};
