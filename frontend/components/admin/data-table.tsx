"use client"

import Link from "next/link"
import * as React from "react"
import { MoreHorizontal, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Column<T> = {
  key: keyof T | string
  label: string
  className?: string
  render?: (item: T) => React.ReactNode
}

type Action<T> = {
  label: string
  onClick: (item: T) => void
  className?: string
}

interface DataTableProps<T> {
  title?: string
  description?: string
  data: T[]
  columns: Column<T>[]
  actions?: Action<T>[]
  createHref?: string
  createLabel?: string
  searchPlaceholder?: string
  searchKeys?: Array<keyof T>
  emptyTitle?: string
  emptyDescription?: string
}

export function DataTable<T extends { id?: string | number }>({
  title,
  description,
  data,
  columns,
  actions = [],
  createHref,
  createLabel = "Create",
  searchPlaceholder = "Search",
  searchKeys = [],
  emptyTitle = "No records yet",
  emptyDescription = "Create your first item to populate this view.",
}: DataTableProps<T>) {
  const [query, setQuery] = React.useState("")

  const filteredData = React.useMemo(() => {
    if (!query.trim() || searchKeys.length === 0) {
      return data
    }

    const normalizedQuery = query.toLowerCase()
    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key]
        return typeof value === "string" && value.toLowerCase().includes(normalizedQuery)
      })
    )
  }, [data, query, searchKeys])

  return (
    <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm shadow-black/5">
      <CardHeader className="border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            {title ? <CardTitle className="text-lg">{title}</CardTitle> : null}
            {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-[240px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-10 rounded-xl border-border/70 bg-muted/30 pl-9"
              />
            </div>
            {createHref ? (
              <Button asChild className="h-10 rounded-xl px-4">
                <Link href={createHref}>
                  <Plus className="size-4" />
                  {createLabel}
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {filteredData.length === 0 ? (
          <div className="flex min-h-[240px] flex-col items-center justify-center gap-2 px-6 py-16 text-center">
            <h3 className="text-base font-semibold">{emptyTitle}</h3>
            <p className="max-w-md text-sm text-muted-foreground">{emptyDescription}</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {columns.map((column) => (
                  <TableHead key={String(column.key)} className={column.className}>
                    {column.label}
                  </TableHead>
                ))}
                {actions.length > 0 ? <TableHead className="w-[72px] text-right">Actions</TableHead> : null}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={String(item.id ?? index)} className="border-border/60">
                  {columns.map((column) => (
                    <TableCell key={String(column.key)} className={column.className}>
                      {column.render ? column.render(item) : String(item[column.key as keyof T] ?? "")}
                    </TableCell>
                  ))}
                  {actions.length > 0 ? (
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-lg">
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">Open actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {actions.map((action) => (
                            <DropdownMenuItem
                              key={action.label}
                              className={action.className}
                              onClick={() => action.onClick(item)}
                            >
                              {action.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
