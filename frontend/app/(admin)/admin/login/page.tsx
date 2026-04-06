'use client';

import { ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthQuery, useLoginMutation } from '@/lib/api/useAuth';

export default function AdminLoginPage() {
  const router = useRouter();
  const { data: user, isLoading } = useAuthQuery({
    redirectOnUnauthorized: false,
  });
  const loginMutation = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isLoading && user?.role === 'admin') {
      router.replace('/admin');
    }
  }, [isLoading, router, user]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,rgba(246,230,205,0.55),rgba(255,255,255,1))] px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(132,146,92,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(145,145,132,0.16),transparent_32%)]" />
      <Card className="relative w-full max-w-md rounded-[28px] border-border/70 bg-background/92 shadow-2xl shadow-black/8">
        <CardHeader className="space-y-4 pb-2 text-left">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--color-rangitoto)] text-white shadow-sm">
            <ShieldCheck className="size-5" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl tracking-tight">Admin access</CardTitle>
            <CardDescription className="text-sm leading-6">
              Sign in to manage content, users, uploads, and operational data.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              loginMutation.mutate({ email, password });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@eshi.org"
                className="h-11 rounded-xl border-border/70 bg-muted/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="h-11 rounded-xl border-border/70 bg-muted/30"
              />
            </div>
            <Button type="submit" className="h-11 w-full rounded-xl" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Signing in...' : 'Continue to admin'}
            </Button>
          </form>
          <div className="rounded-2xl border border-border/70 bg-muted/35 px-4 py-3">
            <p className="text-xs leading-5 text-muted-foreground">
              This workspace is isolated from the public website and reserved for authenticated administrators only.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
