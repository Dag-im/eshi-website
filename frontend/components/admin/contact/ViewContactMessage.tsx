'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useMarkMessageSeen } from '@/lib/api/useContact';
import { motion } from 'framer-motion';
import { Calendar, Check, Mail } from 'lucide-react';
import { useState } from 'react';

interface ViewContactMessageProps {
  _id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  seen: boolean;
}

export function ViewContactMessage({
  _id,
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
      await markSeenMutation.mutateAsync(_id);
      setIsSeen(true);
    } catch (err) {
      console.error('Failed to mark message as seen:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card className="max-w-xl mx-auto border border-lemon-grass shadow-lg hover:shadow-xl transition-shadow duration-300 bg-albescent-white">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-avocado to-deco text-white rounded-t-lg p-4 flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-bold">{name}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-sm text-white/90">
              <Mail className="w-4 h-4" />
              <a
                href={`mailto:${email}`}
                className="underline hover:text-indian-khaki transition-colors"
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
              className="flex items-center gap-1 bg-rangitoto text-white hover:bg-lemon-grass hover:text-rangitoto transition-colors"
            >
              <Check className="w-4 h-4" /> Mark as Seen
            </Button>
          )}
        </CardHeader>

        {/* Content */}
        <CardContent className="p-5 space-y-5">
          <p className="text-rangitoto leading-relaxed">{message}</p>

          <div className="flex items-center gap-2 text-sm text-lemon-grass">
            <Calendar className="w-4 h-4" />
            <span>{new Date(date).toLocaleString()}</span>
          </div>

          <div className="mt-4 text-center">
            <Button
              asChild
              variant={isSeen ? 'outline' : 'default'}
              className={
                isSeen
                  ? 'border-lemon-grass text-rangitoto hover:bg-deco/20'
                  : 'bg-avocado hover:bg-deco text-white'
              }
            >
              <a href={`mailto:${email}`}>Reply via Email</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
