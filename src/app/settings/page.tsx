
"use client"

import { MainNav } from "@/components/layout/main-nav"
import { BentoCard } from "@/components/dashboard/bento-card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Shield, Zap, Terminal, Heart, Scale, Globe } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen">
      <MainNav />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-headline font-bold mb-2">Review Standards</h1>
            <p className="text-muted-foreground">Configure AI priorities and engineering guidelines for automated reviews.</p>
          </div>
          <Button className="bg-accent text-accent-foreground font-bold px-8">Save Changes</Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          <BentoCard title="Core Guardians" icon={<Shield className="w-5 h-5" />}>
            <div className="space-y-6 mt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">Security Vulnerabilities</Label>
                  <p className="text-xs text-muted-foreground">Identify XSS, SQL injection, and insecure dependencies.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">Data Privacy (PII)</Label>
                  <p className="text-xs text-muted-foreground">Detect leaks of user personal data in logs or queries.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">Secrets Detection</Label>
                  <p className="text-xs text-muted-foreground">Prevent hardcoded API keys and credentials.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </BentoCard>

          <BentoCard title="Code Quality" icon={<Terminal className="w-5 h-5" />}>
            <div className="space-y-6 mt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">Strict Typing</Label>
                  <p className="text-xs text-muted-foreground">Enforce explicit types and prevent 'any' usage.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">Naming Conventions</Label>
                  <p className="text-xs text-muted-foreground">Ensure camelCase and descriptive variable names.</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">Cognitive Complexity</Label>
                  <p className="text-xs text-muted-foreground">Flag functions with high nested logic density.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </BentoCard>

          <BentoCard title="Performance" icon={<Zap className="w-5 h-5" />}>
            <div className="space-y-6 mt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">Database Queries</Label>
                  <p className="text-xs text-muted-foreground">Detect N+1 problems and unoptimized SQL joins.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">Memory Management</Label>
                  <p className="text-xs text-muted-foreground">Identify potential memory leaks in long-running processes.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </BentoCard>

          <BentoCard title="Compliance & Accessibility" icon={<Globe className="w-5 h-5" />}>
            <div className="space-y-6 mt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">WCAG 2.1 Compliance</Label>
                  <p className="text-xs text-muted-foreground">Scans UI code for missing ARIA labels and alt text.</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">Localization (i18n)</Label>
                  <p className="text-xs text-muted-foreground">Ensure hardcoded strings are moved to translation files.</p>
                </div>
                <Switch />
              </div>
            </div>
          </BentoCard>
        </div>
      </main>
    </div>
  )
}
