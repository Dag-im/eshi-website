import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // optional, avoids refetch when switching tabs
      retry: 1, // optional, number of retry attempts on failure
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
