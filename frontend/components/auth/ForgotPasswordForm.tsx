'use client';
import { useState } from 'react';
import { useForgotPasswordMutation } from '../../lib/api/useAuth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const { mutate, isPending } = useForgotPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold">Forgot Password</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Reset Link'}
      </Button>
    </form>
  );
}
