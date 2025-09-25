'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthQuery, useResetPasswordMutation } from '@/lib/api/useAuth';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ChangePassword() {
  const { data: user, isLoading, error } = useAuthQuery();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const resetPasswordMutation = useResetPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
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
        onError: (err: any) => {
          toast.error(
            err.response?.data?.error?.message || 'Failed to change password.'
          );
        },
        onSuccess: () => {
          toast.success('Password changed successfully! Please log in again.');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto mt-20 flex justify-center items-center text-lemon-grass">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <Card className="max-w-md mx-auto mt-20 border border-avocado shadow-md">
        <CardContent className="p-6 text-center">
          <p className="text-red-500 mb-3">
            Error loading user data. Please log in again.
          </p>
          <Button asChild variant="outline">
            <a href="/login">Go to Login</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Card className="max-w-md mx-auto mt-20 bg-albescent-white border border-lemon-grass shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-rangitoto">
            Change Password
          </CardTitle>
          <p className="text-sm text-lemon-grass mt-1">
            You must change your password to continue.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 pr-10 border-lemon-grass focus:ring-avocado"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lemon-grass hover:text-avocado"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 pr-10 border-lemon-grass focus:ring-avocado"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lemon-grass hover:text-avocado"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={resetPasswordMutation.isPending}
              className="w-full bg-avocado hover:bg-deco text-white font-semibold py-2 rounded-lg shadow-md transition-transform hover:scale-[1.02]"
            >
              {resetPasswordMutation.isPending ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : null}
              {resetPasswordMutation.isPending
                ? 'Changing...'
                : 'Change Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
