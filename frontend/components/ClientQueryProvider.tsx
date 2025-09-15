'use client';
import { queryClient } from '@/hooks/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

export default function ClientQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
