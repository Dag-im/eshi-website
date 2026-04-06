"use client"

import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useAuthQuery } from "@/lib/api/useAuth"

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data: user, isLoading, isError } = useAuthQuery()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (isError) {
      router.replace("/admin/login")
      return
    }

    if (user?.role !== "admin") {
      router.replace("/403")
    }
  }, [isError, isLoading, router, user])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,rgba(246,230,205,0.35),rgba(255,255,255,1))]">
        <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/90 px-5 py-4 shadow-sm">
          <Loader2 className="size-5 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Preparing the admin workspace...</span>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return <>{children}</>
}
