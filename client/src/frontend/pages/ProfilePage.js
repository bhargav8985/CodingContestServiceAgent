import React, { useState } from 'react';
import { FaEnvelope, FaBell, FaCheckCircle } from 'react-icons/fa';

const ProfilePage = ({ user, onUpdate }) => {
  const [email, setEmail] = useState(user?.email || '');
  const [notificationsEnabled, setNotificationsEnabled] = useState(user?.notificationsEnabled ?? true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`http://localhost:5000/api/users/profile/${user._id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, notificationsEnabled }),
});


      if (!res.ok) throw new Error('Failed to update user');

      const updatedUser = await res.json();
      onUpdate(updatedUser);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Something went wrong!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto border border-gray-100">
      <div className="flex items-center mb-6">
        <FaEnvelope className="text-indigo-500 text-2xl mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <FaEnvelope className="mr-2 text-gray-500" />
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition duration-200"
            required
          />
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifications"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition duration-200"
          />
          <label htmlFor="notifications" className="ml-3 block text-sm text-gray-700">
            <FaBell className="inline mr-1" />
            Receive email notifications
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-md transition-all duration-200 transform ${isSubmitting ? 'bg-blue-500/80' : 'hover:scale-105'}`}
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
    </div>
  );
};

export default ProfilePage;
