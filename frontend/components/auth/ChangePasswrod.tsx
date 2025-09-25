'use client';
import { useAuthQuery, useResetPasswordMutation } from '@/lib/api/useAuth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ChangePassword() {
  const { data: user, isLoading, error } = useAuthQuery();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const resetPasswordMutation = useResetPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      console.error('ChangePassword: No user ID available');
      toast.error('User not found. Please log in again.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    resetPasswordMutation.mutate(
      { userId: user.id, newPassword },
      {
        onError: (error: any) => {
          console.error('ChangePassword: Reset password error:', error);
          toast.error(
            error.response?.data?.error?.message || 'Failed to change password.'
          );
        },
        onSuccess: () => {
          toast.success('Password changed successfully! Please log in again.');
        },
      }
    );
  };

  if (isLoading) {
    return <div className="max-w-md mx-auto mt-10 p-6">Loading...</div>;
  }

  if (error || !user) {
    console.error('ChangePassword: Error or no user:', error);
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <p className="text-red-500">
          Error loading user data. Please log in again.
        </p>
        <a href="/login" className="text-blue-500 hover:underline">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <p className="mb-4">You must change your password to continue.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
            minLength={8}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
            minLength={8}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
}
