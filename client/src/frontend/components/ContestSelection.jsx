import React, { useState } from 'react';
import { FaCode, FaChartLine, FaCheckCircle, FaFilter, FaTrophy } from 'react-icons/fa';

const platforms = [
  {
    name: 'Codeforces',
    icon: <FaTrophy className="text-orange-500" />,
    ratings: [
      { label: 'Div.1 (1900+)', value: 1900 },
      { label: 'Div.2 (1400+)', value: 1400 },
      { label: 'Div.3 (0+)', value: 0 }
    ]
  },
  {
    name: 'LeetCode',
    icon: <FaCode className="text-yellow-500" />,
    ratings: [
      { label: 'All Levels', value: 0 },
      { label: 'Easy (1000+)', value: 1000 },
      { label: 'Medium (1200+)', value: 1200 },
      { label: 'Hard (1400+)', value: 1400 }
    ]
  },
  {
    name: 'AtCoder',
    icon: <FaChartLine className="text-blue-500" />,
    ratings: [
      { label: 'All Levels', value: 0 },
      { label: 'Beginner (1000+)', value: 1000 },
      { label: 'Intermediate (1200+)', value: 1200 },
      { label: 'Advanced (1400+)', value: 1400 }
    ]
  },
  {
    name: 'HackerEarth',
    icon: <FaChartLine className="text-blue-500" />,
    ratings: [
      { label: 'All Levels', value: 0 },
      { label: 'Basic (1000+)', value: 1000 },
      { label: 'Intermediate (1200+)', value: 1200 }
    ]
  }
];

const ContestSelection = ({ user }) => {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
    setSelectedRating('');
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) return alert("User not found");
    setIsSubmitting(true);

    try {
      const res = await fetch(`http://localhost:5000/api/user/contest-preferences/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contestPreferences: [{ platform: selectedPlatform, minRating: Number(selectedRating) }]
        })
      });

      if (res.ok) {
        alert('Contest preferences saved successfully!');
      } else {
        const msg = await res.text();
        alert(`Failed: ${msg}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error saving contest preferences');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto border border-gray-100">
      <div className="flex items-center mb-6">
        <FaFilter className="text-purple-500 text-2xl mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Contest Preferences</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FaCode className="mr-2 text-gray-500" />
            Select Platform
          </label>
          <select
            id="platform"
            value={selectedPlatform}
            onChange={handlePlatformChange}
            className="form-select w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
            required
          >
            <option value="">-- Choose a platform --</option>
            {platforms.map((platform) => (
              <option key={platform.name} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>

        {selectedPlatform && (
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaChartLine className="mr-2 text-gray-500" />
              Select Difficulty Level
            </label>
            <select
              id="rating"
              value={selectedRating}
              onChange={handleRatingChange}
              className="form-select w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              required
            >
              <option value="">-- Select level --</option>
              {platforms
                .find((p) => p.name === selectedPlatform)
                .ratings.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-md transition-all duration-200 transform ${isSubmitting ? 'scale-95' : 'hover:scale-105'}`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            <span className="flex items-center">
              <FaCheckCircle className="mr-2" />
              Save Changes
            </span>
          )}
        </button>
      </form>

      <div className="mt-6 text-xs text-gray-500 flex items-center">
        <FaTrophy className="mr-1" />
        <span>We'll notify you about contests matching your preferences</span>
      </div>
    </div>
  );
};

export default ContestSelection;
