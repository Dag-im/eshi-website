'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { DataTable } from '@/components/admin/data-table';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { useAuthQuery } from '@/lib/api/useAuth';
import {
  useDeleteUser,
  useResetUserPassword,
  useUpdateUser,
  useUsers,
} from '@/lib/api/useUsers';
import { User } from '@/types/auth';

export default function AdminUsersPage() {
  const { data: currentUser } = useAuthQuery();
  const { data: users = [] } = useUsers();
  const deleteUser = useDeleteUser();
  const resetPassword = useResetUserPassword();
  const updateUser = useUpdateUser();
  const [confirmState, setConfirmState] = useState<{
    type: 'delete' | 'toggle' | 'reset' | null;
    user: User | null;
  }>({ type: null, user: null });

  const activeActionLoading = useMemo(() => {
    if (!confirmState.type) return false;
    if (confirmState.type === 'delete') return deleteUser.isPending;
    if (confirmState.type === 'reset') return resetPassword.isPending;
    return updateUser.isPending;
  }, [confirmState.type, deleteUser.isPending, resetPassword.isPending, updateUser.isPending]);

  const selectedUser = confirmState.user;

  return (
    <>
      <PageHeader
        title="User management"
        description="Manage administrator accounts, enforce password resets, and control access without leaving the workspace."
        action={
          <Button asChild className="rounded-xl">
            <Link href="/admin/users/create">New user</Link>
          </Button>
        }
      />

      <DataTable<User>
        title="Administrators"
        description="Internal users with access to the admin application."
        data={users}
        searchKeys={['name', 'email']}
        searchPlaceholder="Search administrators"
        createHref="/admin/users/create"
        createLabel="Add user"
        columns={[
          {
            key: 'name',
            label: 'User',
            render: (user: User) => (
              <div className="space-y-1">
                <p className="font-medium">{user.name || 'Unnamed user'}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            ),
          },
          {
            key: 'role',
            label: 'Role',
            render: (user: User) => (
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                {user.role}
              </span>
            ),
          },
          {
            key: 'isActive',
            label: 'Status',
            render: (user: User) => (
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  user.isActive
                    ? 'bg-primary/10 text-primary'
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
            ),
          },
          {
            key: 'mustChangePassword',
            label: 'Security',
            render: (user: User) => (
              <span className="text-sm text-muted-foreground">
                {user.mustChangePassword ? 'Password reset pending' : 'Normal'}
              </span>
            ),
          },
        ]}
        actions={[
          {
            label: 'Edit user',
            onClick: (user) => (window.location.href = `/admin/users/edit/${user.id}`),
          },
          {
            label: 'Reset password',
            onClick: (user) => setConfirmState({ type: 'reset', user }),
          },
          {
            label: 'Activate / deactivate',
            onClick: (user) => setConfirmState({ type: 'toggle', user }),
          },
          {
            label: 'Delete user',
            onClick: (user) => setConfirmState({ type: 'delete', user }),
            className: 'text-destructive focus:text-destructive',
          },
        ]}
        emptyTitle="No admin users found"
        emptyDescription="Add a user to start managing administrator access."
      />

      <ConfirmDialog
        open={Boolean(confirmState.type && selectedUser)}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmState({ type: null, user: null });
          }
        }}
        title={
          confirmState.type === 'delete'
            ? 'Delete user'
            : confirmState.type === 'reset'
            ? 'Reset password'
            : 'Change access state'
        }
        description={
          confirmState.type === 'delete'
            ? `Permanently remove ${selectedUser?.email}. This cannot be undone.`
            : confirmState.type === 'reset'
            ? `Reset the password for ${selectedUser?.email} back to the default temporary password.`
            : selectedUser?.id === currentUser?.id && selectedUser?.isActive
            ? 'You cannot deactivate your own account.'
            : `This will ${selectedUser?.isActive ? 'deactivate' : 'reactivate'} ${selectedUser?.email}.`
        }
        confirmLabel={
          confirmState.type === 'delete'
            ? 'Delete user'
            : confirmState.type === 'reset'
            ? 'Reset password'
            : selectedUser?.isActive
            ? 'Deactivate'
            : 'Activate'
        }
        variant={confirmState.type === 'delete' ? 'destructive' : 'default'}
        isLoading={activeActionLoading}
        onConfirm={async () => {
          if (!selectedUser || !confirmState.type) return;

          if (confirmState.type === 'delete') {
            await deleteUser.mutateAsync(String(selectedUser.id));
          } else if (confirmState.type === 'reset') {
            await resetPassword.mutateAsync(String(selectedUser.id));
          } else {
            await updateUser.mutateAsync({
              id: String(selectedUser.id),
              data: { isActive: !selectedUser.isActive },
            });
          }

          setConfirmState({ type: null, user: null });
        }}
      />
    </>
  );
}
