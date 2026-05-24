
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  GitPullRequest, 
  Settings, 
  Activity, 
  ShieldCheck,
  Zap
} from "lucide-react"

const items = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Pull Requests", href: "/reviews", icon: GitPullRequest },
  { name: "Health Metrics", href: "/health", icon: Activity },
  { name: "Security Guard", href: "/security", icon: ShieldCheck },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2 p-4 w-64 border-r h-screen bg-card sticky top-0">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="bg-primary p-1.5 rounded-lg">
          <Zap className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
        </div>
        <span className="font-headline font-bold text-xl tracking-tight">DiffSense</span>
      </div>
      
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group",
                pathname === item.href 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn(
                "w-5 h-5",
                pathname === item.href ? "text-primary-foreground" : "group-hover:text-accent"
              )} />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>

      <div className="mt-auto p-4 bg-muted/30 rounded-xl border border-border/50">
        <p className="text-xs text-muted-foreground mb-2">SCANNING STATUS</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-medium">Real-time active</span>
        </div>
      </div>
    </nav>
  )
}
