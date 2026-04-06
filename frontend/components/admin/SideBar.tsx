"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  Presentation,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero", icon: ImageIcon },
  { href: "/admin/users", label: "Users", icon: ShieldCheck },
  { href: "/admin/services", label: "Services", icon: BriefcaseBusiness },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/presentations", label: "Presentations", icon: Presentation },
  { href: "/admin/impacts", label: "Impacts", icon: Sparkles },
  { href: "/admin/contact", label: "Messages", icon: Inbox },
] as const

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  onNavigate?: () => void
}

export function AdminSidebar({ collapsed, onToggle, onNavigate }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex h-screen flex-col overflow-hidden border-r border-border/70 bg-white/80 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-20" : "w-72"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border/70 px-4">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="flex size-10 items-center justify-center rounded-2xl bg-[var(--color-rangitoto)] text-white shadow-sm">
            E
          </div>
          {!collapsed ? (
            <div>
              <p className="text-sm font-semibold text-foreground">ESHI Admin</p>
              <p className="text-xs text-muted-foreground">Workspace console</p>
            </div>
          ) : null}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hidden rounded-xl lg:inline-flex"
          onClick={onToggle}
        >
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navigation.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all",
                active
                  ? "bg-[var(--color-rangitoto)] text-white shadow-sm"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {!collapsed ? <span>{item.label}</span> : null}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border/70 p-4">
        <div className={cn("rounded-2xl bg-muted/60 p-4", collapsed && "p-3 text-center")}>
          {!collapsed ? (
            <>
              <p className="text-sm font-medium">Designed for operators</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Manage content, people, and incoming communication from one clean control surface.
              </p>
            </>
          ) : (
            <Sparkles className="mx-auto size-5 text-muted-foreground" />
          )}
        </div>
      </div>
    </aside>
  )
}
