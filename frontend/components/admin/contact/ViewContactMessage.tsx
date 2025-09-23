'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useMarkMessageSeen } from '@/lib/api/useContact'; // adjust the path
import { Calendar, Check, Mail } from 'lucide-react';
import { useState } from 'react';

interface ViewContactMessageProps {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  seen: boolean;
}

export function ViewContactMessage({
  id,
  name,
  email,
  message,
  date,
  seen,
}: ViewContactMessageProps) {
  const [isSeen, setIsSeen] = useState(seen);
  const markSeenMutation = useMarkMessageSeen();

  const handleMarkAsSeen = async () => {
    try {
      await markSeenMutation.mutateAsync(id);
      setIsSeen(true);
    } catch (err) {
      console.error('Failed to mark message as seen:', err);
    }
  };

  return (
    <Card className="max-w-xl mx-auto border shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg p-4 flex justify-between items-center">
        <div>
          <CardTitle className="text-lg font-bold">{name}</CardTitle>
          <CardDescription className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4" />
            <a
              href={`mailto:${email}`}
              className="underline hover:text-yellow-300 transition-colors"
            >
              {email}
            </a>
          </CardDescription>
        </div>
        {!isSeen && (
          <Button
            size="sm"
            variant="secondary"
            onClick={handleMarkAsSeen}
            className="flex items-center gap-1"
          >
            <Check className="w-4 h-4" /> Mark as Seen
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <p className="text-gray-700">{message}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date(date).toLocaleString()}</span>
        </div>
        <div className="mt-4 text-center">
          <Button asChild variant={isSeen ? 'outline' : 'default'}>
            <a href={`mailto:${email}`}>Reply via Email</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
