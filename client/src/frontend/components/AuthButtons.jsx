import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export const AuthButtons = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) return alert("Fill all fields!");
    onLoginSuccess({ email });
  };

  const handleGoogleLogin = () => {
    onLoginSuccess({ email: "user@gmail.com" }); // Mock Google login
  };

  return (
    <div className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center w-full bg-white border p-2 rounded hover:bg-gray-50"
      >
        <FcGoogle className="mr-2" /> Login with Google
      </button>
    </div>
  );
};
