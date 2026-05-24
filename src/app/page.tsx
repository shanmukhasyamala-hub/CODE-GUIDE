
"use client"

import { MainNav } from "@/components/layout/main-nav"
import { BentoCard } from "@/components/dashboard/bento-card"
import { MOCK_PRS, HEALTH_METRICS, DEBT_HOTSPOTS } from "@/app/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { 
  GitPullRequest, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  Terminal,
  BrainCircuit,
  Lock,
  Gauge
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <MainNav />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-headline font-bold mb-2">Engineering Health</h1>
            <p className="text-muted-foreground">Real-time analysis of repository performance and technical debt.</p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Health Score</p>
              <p className="text-3xl font-headline font-bold text-accent">84.2</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <BentoCard 
            title="Active Reviews" 
            subtitle="Processing pull requests"
            icon={<GitPullRequest className="w-5 h-5" />}
          >
            <div className="flex items-end justify-between mt-4">
              <span className="text-5xl font-headline font-bold">12</span>
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                +4 since yesterday
              </Badge>
            </div>
          </BentoCard>

          <BentoCard 
            title="Issues Detected" 
            subtitle="Security and performance bugs"
            icon={<AlertCircle className="w-5 h-5" />}
          >
            <div className="flex items-end justify-between mt-4">
              <span className="text-5xl font-headline font-bold text-destructive">24</span>
              <div className="text-right">
                <p className="text-sm font-medium text-destructive">8 critical</p>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </div>
            </div>
          </BentoCard>

          <BentoCard 
            title="Avg. Review Time" 
            subtitle="Time saved by AI"
            icon={<Gauge className="w-5 h-5" />}
          >
            <div className="flex items-end justify-between mt-4">
              <span className="text-5xl font-headline font-bold">14m</span>
              <p className="text-sm text-accent flex items-center gap-1 font-medium">
                -82% vs manual <ArrowUpRight className="w-4 h-4" />
              </p>
            </div>
          </BentoCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <BentoCard 
            title="Repository Stability" 
            className="lg:col-span-2"
            icon={<Activity className="w-5 h-5" />}
          >
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={HEALTH_METRICS}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} domain={[60, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#6489E7' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#6489E7" 
                    strokeWidth={3} 
                    dot={{ fill: '#6489E7', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </BentoCard>

          <BentoCard title="Technical Debt Radar" icon={<BrainCircuit className="w-5 h-5" />}>
            <div className="h-[300px] w-full mt-4 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={DEBT_HOTSPOTS}>
                  <PolarGrid stroke="#1f2937" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Debt"
                    dataKey="A"
                    stroke="#2AA9EE"
                    fill="#2AA9EE"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </BentoCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BentoCard title="Recent Pull Requests" icon={<GitPullRequest className="w-5 h-5" />}>
            <div className="space-y-4 mt-4">
              {MOCK_PRS.map((pr) => (
                <Link key={pr.id} href={`/reviews/${pr.id}`} className="block group">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50 hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        pr.status === 'issues_found' ? "bg-destructive/10 text-destructive" :
                        pr.status === 'cleared' ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                      )}>
                        {pr.status === 'cleared' ? <CheckCircle2 className="w-6 h-6" /> : <GitPullRequest className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">{pr.title}</h4>
                        <p className="text-xs text-muted-foreground">{pr.id} • {pr.repository}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={cn(
                        pr.status === 'issues_found' ? "border-destructive text-destructive" :
                        pr.status === 'cleared' ? "border-accent text-accent" : "border-muted text-muted-foreground"
                      )}>
                        {pr.status.replace('_', ' ')}
                      </Badge>
                      <p className="text-[10px] text-muted-foreground mt-1">2h ago</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </BentoCard>

          <BentoCard title="Review Standards" icon={<Terminal className="w-5 h-5" />}>
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/50">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">Strict Security Scanning</span>
                </div>
                <Badge className="bg-accent text-accent-foreground">ENFORCED</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/50 opacity-60">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Naming Conventions</span>
                </div>
                <Badge variant="outline">MONITORING</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/50">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Performance Profiling</span>
                </div>
                <Badge className="bg-accent text-accent-foreground">ENFORCED</Badge>
              </div>
            </div>
          </BentoCard>
        </div>
      </main>
    </div>
  )
}

import { Activity } from "lucide-react"
