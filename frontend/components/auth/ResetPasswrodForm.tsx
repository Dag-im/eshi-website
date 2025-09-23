'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useResetPasswordMutation } from '../../lib/api/useAuth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const { mutate, isPending } = useResetPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, token, newPassword });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold">Reset Password</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={isPending || !token}>
        {isPending ? 'Resetting...' : 'Reset Password'}
      </Button>
    </form>
  );
}
