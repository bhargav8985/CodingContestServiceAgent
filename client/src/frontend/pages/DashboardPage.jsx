import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ContestSelection from '../components/ContestSelection';

const DashboardPage = () => {
  const location = useLocation();
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('contestMailerUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userParam = queryParams.get('user');

    if (userParam) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userParam));
        setUser(parsedUser);
        localStorage.setItem('contestMailerUser', JSON.stringify(parsedUser));
      } catch (err) {
        console.error('Failed to parse user from query:', err);
      }
    }
  }, [location.search]);

  const handleSelection = (selection) => {
    console.log('Selected:', selection);
  };

  if (!user) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name || user.email}</h1>
      {user.picture && (
        <img
          src={user.picture}
          alt="User"
          className="rounded-full w-16 h-16 mb-4"
        />
      )}

      {/* ✅ Only render ContestSelection */}
      <div className="mb-8">
        <ContestSelection user={user} onSelect={handleSelection} />
      </div>
    </div>
  );
};

export default DashboardPage;
