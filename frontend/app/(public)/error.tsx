'use client';

import { Button } from '@/components/ui/button';

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-semibold text-rangitoto">Something went wrong</h1>
        <p className="mt-3 text-rangitoto/70">
          We could not load this page. Please try again.
        </p>
        <p className="mt-2 text-xs text-rangitoto/60">{error.message}</p>
        <Button
          type="button"
          className="mt-6 bg-avocado text-white hover:bg-rangitoto"
          onClick={() => reset()}
        >
          Try again
        </Button>
      </div>
    </main>
  );
}
