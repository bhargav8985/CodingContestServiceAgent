import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import { EmailPreferences } from './components/EmailPreferences';
import { Navbar } from './components/Navbar';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('contestMailerUser'); // ✅ fixed key
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    localStorage.setItem('contestMailerUser', JSON.stringify(userData)); // ✅ fixed key
    setUser(userData);
  };

  const handleRegister = (userData) => {
    localStorage.setItem('contestMailerUser', JSON.stringify(userData)); // ✅ fixed key
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('contestMailerUser'); // ✅ fixed key
    setUser(null);
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    localStorage.setItem('contestMailerUser', JSON.stringify(newUser)); // ✅ fixed key
    setUser(newUser);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/register"
            element={<RegisterPage onRegister={handleRegister} />}
          />
          <Route
            path="/dashboard"
            element={
              user ? (
                <DashboardPage user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <ProfilePage user={user} onUpdate={updateUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/preferences"
            element={
              user ? (
                <EmailPreferences user={user} onUpdate={updateUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="py-4 bg-white border-t text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Coding Contest Email Agent
      </footer>
    </div>
  );
}

export default App;
