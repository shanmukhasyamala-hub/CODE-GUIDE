
"use client"

import { MainNav } from "@/components/layout/main-nav"
import { BentoCard } from "@/components/dashboard/bento-card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  ShieldAlert, 
  Eye, 
  CheckCircle2,
  AlertTriangle
} from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen">
      <MainNav />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-headline font-bold mb-2">Security Guard</h1>
          <p className="text-muted-foreground">Automated vulnerability scanning and compliance monitoring.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <BentoCard title="Overall Risk" icon={<ShieldAlert className="w-5 h-5" />}>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Low Risk</span>
                <span className="text-sm text-muted-foreground">82% Secure</span>
              </div>
              <Progress value={82} className="h-2 bg-muted" />
            </div>
          </BentoCard>

          <BentoCard title="Secrets Scanned" icon={<Key className="w-5 h-5" />}>
            <div className="mt-4">
              <p className="text-4xl font-headline font-bold">0</p>
              <p className="text-xs text-accent flex items-center gap-1 mt-1 font-medium">
                <CheckCircle2 className="w-3 h-3" /> No leaks detected
              </p>
            </div>
          </BentoCard>

          <BentoCard title="Vulnerabilities" icon={<Lock className="w-5 h-5" />}>
            <div className="mt-4">
              <div className="flex items-end justify-between">
                <p className="text-4xl font-headline font-bold text-destructive">3</p>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Pending patches</p>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BentoCard title="Active Threats" icon={<Eye className="w-5 h-5" />}>
            <div className="space-y-4 mt-4">
              <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20 flex items-start gap-4">
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Potential SQL Injection</h4>
                  <p className="text-xs text-muted-foreground mt-1">Detected in src/api/user.ts:45. Unsanitized input from query parameters.</p>
                  <Badge variant="destructive" className="mt-3 text-[10px]">CRITICAL</Badge>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20 flex items-start gap-4">
                <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Outdated Dependency</h4>
                  <p className="text-xs text-muted-foreground mt-1">Package 'jsonwebtoken' is 2 versions behind. Known minor vulnerability.</p>
                  <Badge className="mt-3 text-[10px] bg-yellow-500 text-black">MEDIUM</Badge>
                </div>
              </div>
            </div>
          </BentoCard>

          <BentoCard title="Compliance Checklist" icon={<ShieldCheck className="w-5 h-5" />}>
            <div className="space-y-4 mt-4">
              {[
                { name: "OWASP Top 10", status: true },
                { name: "GDPR Data Isolation", status: true },
                { name: "SOC2 Compliance", status: false },
                { name: "HIPAA Guardrails", status: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50">
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.status ? (
                    <Badge className="bg-accent/20 text-accent border-accent/30">PASSING</Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">AUDIT PENDING</Badge>
                  )}
                </div>
              ))}
            </div>
          </BentoCard>
        </div>
      </main>
    </div>
  )
}
