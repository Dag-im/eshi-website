'use client';

import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, Inbox, Presentation, ShieldCheck, Users } from 'lucide-react';

import { MetricCard } from '@/components/admin/metric-card';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useContactMessages } from '@/lib/api/useContact';
import { usePresentations } from '@/lib/api/usePresentations';
import { useServices } from '@/lib/api/useService';
import { useTeamMembers } from '@/lib/api/useTeam';
import { useUsers } from '@/lib/api/useUsers';
import { ContactMessage } from '@/types/contact';

export default function AdminDashboardPage() {
  const { data: users = [] } = useUsers();
  const { data: services = [] } = useServices();
  const { data: teamMembers = [] } = useTeamMembers();
  const { data: presentations = [] } = usePresentations();
  const { data: messages = [] } = useContactMessages();

  const unseenMessages = messages.filter((message: { seen: boolean }) => !message.seen);
  const activeUsers = users.filter((user: { isActive: boolean }) => user.isActive);

  return (
    <>
      <PageHeader
        title="Operations overview"
        description="A clean snapshot of the workspace, content inventory, and user activity across the admin system."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Active admins"
          value={activeUsers.length}
          description={`${users.length} total user accounts`}
          icon={ShieldCheck}
        />
        <MetricCard
          title="Services published"
          value={services.length}
          description="Structured offerings available on the public site"
          icon={BriefcaseBusiness}
        />
        <MetricCard
          title="Team profiles"
          value={teamMembers.length}
          description="Leadership and delivery team members"
          icon={Users}
        />
        <MetricCard
          title="Unread messages"
          value={unseenMessages.length}
          description={`${messages.length} total contact submissions`}
          icon={Inbox}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent contact activity</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Latest messages received through the public contact form.
              </p>
            </div>
            <Button asChild variant="ghost" className="rounded-xl">
              <Link href="/admin/contact">
                View all
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {messages.slice(0, 5).map((message: ContactMessage) => (
              <div
                key={message.id}
                className="flex items-start justify-between gap-4 rounded-2xl border border-border/70 bg-muted/20 p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{message.name}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        message.seen
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {message.seen ? 'Seen' : 'New'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{message.email}</p>
                  <p className="line-clamp-2 text-sm leading-6 text-foreground/80">
                    {message.message}
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="rounded-xl">
                  <Link href={`/admin/contact/view/${message.id}`}>Open</Link>
                </Button>
              </div>
            ))}
            {messages.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border/80 p-10 text-center text-sm text-muted-foreground">
                No contact activity yet.
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
          <CardHeader>
            <CardTitle className="text-lg">Content health</CardTitle>
            <p className="text-sm text-muted-foreground">
              A quick read on the current publishing footprint.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Presentations', value: presentations.length, icon: Presentation },
              { label: 'Services', value: services.length, icon: BriefcaseBusiness },
              { label: 'Team members', value: teamMembers.length, icon: Users },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/20 px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">Current published records</p>
                  </div>
                </div>
                <p className="text-2xl font-semibold tracking-tight">{item.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
