'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLoginMutation } from '../../lib/api/useAuth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending } = useLoginMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-md mx-auto p-6 my-12 bg-glass-bg backdrop-blur-md border border-glass-border rounded-xl shadow-glass"
      role="form"
      aria-labelledby="login-title"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2
          id="login-title"
          className="text-3xl font-bold text-center text-gray-800"
        >
          Admin Login
        </h2>
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            aria-label="Email address"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            aria-label="Password"
          />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Logging in...' : 'Login'}
        </Button>
        <p className="text-sm text-gray-500 text-center">
          If your password was reset by an admin, you will be prompted to change
          it after login.
        </p>
      </form>
    </motion.div>
  );
}
