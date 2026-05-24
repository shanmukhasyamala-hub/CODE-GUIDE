
"use client"

import { MainNav } from "@/components/layout/main-nav"
import { BentoCard } from "@/components/dashboard/bento-card"
import { HEALTH_METRICS } from "@/app/lib/mock-data"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts"
import { 
  Activity, 
  TrendingUp, 
  Clock, 
  Zap,
  BarChart3,
  History
} from "lucide-react"

const VELOCITY_DATA = [
  { name: 'Sprint 1', value: 45 },
  { name: 'Sprint 2', value: 52 },
  { name: 'Sprint 3', value: 48 },
  { name: 'Sprint 4', value: 61 },
  { name: 'Sprint 5', value: 55 },
  { name: 'Sprint 6', value: 67 },
]

export default function HealthPage() {
  return (
    <div className="flex min-h-screen">
      <MainNav />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-headline font-bold mb-2">Health Metrics</h1>
          <p className="text-muted-foreground">Detailed analytical breakdown of engineering performance and stability.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BentoCard 
            title="Stability Trend" 
            subtitle="Overall codebase health score over time"
            icon={<TrendingUp className="w-5 h-5" />}
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
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </BentoCard>

          <BentoCard 
            title="Development Velocity" 
            subtitle="Feature completion rate per sprint"
            icon={<Zap className="w-5 h-5" />}
          >
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={VELOCITY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {VELOCITY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === VELOCITY_DATA.length - 1 ? '#2AA9EE' : '#6489E7'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </BentoCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BentoCard title="Avg. Cycle Time" icon={<Clock className="w-5 h-5" />}>
            <div className="mt-4">
              <p className="text-4xl font-headline font-bold">2.4 Days</p>
              <p className="text-sm text-accent font-medium mt-1">Improved by 12%</p>
            </div>
          </BentoCard>
          <BentoCard title="PR Success Rate" icon={<BarChart3 className="w-5 h-5" />}>
            <div className="mt-4">
              <p className="text-4xl font-headline font-bold">94.8%</p>
              <p className="text-sm text-muted-foreground mt-1">From 82 active PRs</p>
            </div>
          </BentoCard>
          <BentoCard title="Deployment Freq." icon={<History className="w-5 h-5" />}>
            <div className="mt-4">
              <p className="text-4xl font-headline font-bold">14/Week</p>
              <p className="text-sm text-primary font-medium mt-1">Steady performance</p>
            </div>
          </BentoCard>
        </div>
      </main>
    </div>
  )
}
