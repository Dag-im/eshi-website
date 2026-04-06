"use client"

import { useState } from "react"

import { AdminAuthGuard } from "@/components/admin/auth-guard"
import { AdminNavbar } from "@/components/admin/navbar"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useAuthQuery } from "@/lib/api/useAuth"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { data: user } = useAuthQuery()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <AdminAuthGuard>
      {user ? (
        <div className="h-screen overflow-hidden bg-[linear-gradient(180deg,rgba(246,230,205,0.22),rgba(255,255,255,1))] text-foreground">
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(132,146,92,0.10),transparent_55%)]" />
          <div className="relative flex h-screen">
            <div className="hidden lg:block">
              <AdminSidebar
                collapsed={collapsed}
                onToggle={() => setCollapsed((current) => !current)}
              />
            </div>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetContent side="left" className="p-0 sm:max-w-xs">
                <AdminSidebar
                  collapsed={false}
                  onToggle={() => setMobileOpen(false)}
                  onNavigate={() => setMobileOpen(false)}
                />
              </SheetContent>
            </Sheet>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <AdminNavbar user={user} onOpenMobileMenu={() => setMobileOpen(true)} />
              <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-6 lg:py-8">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
      ) : null}
    </AdminAuthGuard>
  )
}
