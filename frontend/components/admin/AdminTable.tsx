'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import * as React from 'react';

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
};

type ExtraAction<T> = {
  label: string;
  icon: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  onClick: (item: T) => void;
};

interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  onCreate?: () => void;
  searchPlaceholder?: string;
  extraActions?: ExtraAction<T>[];
}

export function AdminTable<T extends { _id?: string | number }>({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
  onCreate,
  searchPlaceholder = 'Search...',
  extraActions = [],
}: AdminTableProps<T>) {
  const [query, setQuery] = React.useState('');

  const filtered = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <Card className="p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        {onCreate && (
          <Button onClick={onCreate}>
            <Plus className="h-4 w-4 mr-2" /> Create
          </Button>
        )}
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key as string}>{col.label}</TableHead>
            ))}
            {(onEdit || onDelete || onView || extraActions.length > 0) && (
              <TableHead className="w-[180px]">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="text-center text-muted-foreground"
              >
                No data found
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((item) => (
              <TableRow key={item._id || JSON.stringify(item)}>
                {columns.map((col) => (
                  <TableCell key={col.key as string}>
                    {col.render
                      ? col.render(item)
                      : String(item[col.key as keyof T])}
                  </TableCell>
                ))}
                {(onEdit || onDelete || onView || extraActions.length > 0) && (
                  <TableCell className="flex gap-2 flex-wrap">
                    {onView && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onView(item)}
                        aria-label="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(item)}
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(item)}
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                    {extraActions.map((action, idx) => (
                      <Button
                        key={idx}
                        size="sm"
                        variant={action.variant || 'outline'}
                        onClick={() => action.onClick(item)}
                        aria-label={action.label}
                        title={action.label}
                      >
                        {action.icon}
                      </Button>
                    ))}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
