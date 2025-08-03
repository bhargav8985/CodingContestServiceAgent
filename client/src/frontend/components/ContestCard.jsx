import React from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';

export const ContestCard = ({ contest }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{contest.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{contest.platform}</p>
          </div>
          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {contest.difficulty || 'Medium'}
          </span>
        </div>
        
        <div className="mt-4 flex items-center text-sm text-gray-600">
          <FiCalendar className="mr-1.5" />
          {new Date(contest.startTime).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <FiClock className="mr-1.5" />
          Duration: {contest.duration}
        </div>
        
        <button className="mt-4 w-full py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors">
          Add to Calendar
        </button>
      </div>
    </div>
  );
};
