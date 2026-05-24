
"use client"

import { useParams } from "next/navigation"
import { MainNav } from "@/components/layout/main-nav"
import { MOCK_PRS } from "@/app/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  GitPullRequest, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ChevronRight,
  MessageSquare,
  Sparkles,
  ShieldAlert,
  Zap,
  Play
} from "lucide-react"
import { useState } from "react"
import { analyzePullRequestIssues, type AnalyzePullRequestIssuesOutput } from "@/ai/flows/analyze-pull-request-issues"
import { cn } from "@/lib/utils"

export default function ReviewDetailPage() {
  const params = useParams()
  const pr = MOCK_PRS.find(p => p.id === params.id)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<AnalyzePullRequestIssuesOutput | null>(null)

  if (!pr) return <div className="p-8 text-center">Pull request not found.</div>

  const startScan = async () => {
    setIsScanning(true)
    try {
      const result = await analyzePullRequestIssues({ prDiff: pr.diff })
      setScanResult(result)
    } catch (e) {
      console.error(e)
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <MainNav />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b bg-card/30 p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Pull Requests</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-mono text-primary">{pr.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold font-headline">{pr.title}</h1>
              <Badge className={cn(
                "capitalize",
                pr.status === 'cleared' ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
              )}>
                {pr.status.replace('_', ' ')}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-border/50 gap-2">
                <Clock className="w-4 h-4" /> History
              </Button>
              <Button 
                onClick={startScan} 
                disabled={isScanning}
                className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 font-bold shadow-lg shadow-accent/20"
              >
                {isScanning ? <Sparkles className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                {isScanning ? 'Analyzing...' : 'Trigger Scan'}
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-hidden border-r bg-[#0d0e12]">
            <Tabs defaultValue="files" className="h-full flex flex-col">
              <div className="flex items-center justify-between px-4 bg-muted/20 border-b">
                <TabsList className="bg-transparent border-none">
                  <TabsTrigger value="files" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Changed Files</TabsTrigger>
                  <TabsTrigger value="commits" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Commits</TabsTrigger>
                  <TabsTrigger value="checks" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">CI/CD</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>1 file changed</span>
                  <span>12 additions</span>
                  <span>1 deletion</span>
                </div>
              </div>
              <TabsContent value="files" className="flex-1 m-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <div className="rounded-lg border border-border/50 overflow-hidden mb-8">
                      <div className="bg-card p-2 px-4 border-b flex items-center justify-between">
                        <span className="text-sm font-mono text-muted-foreground">src/auth/service.ts</span>
                        <Badge variant="outline" className="text-[10px] font-mono">TypeScript</Badge>
                      </div>
                      <div className="bg-[#0d0e12] p-4 font-code text-sm leading-relaxed overflow-x-auto">
                        <pre className="whitespace-pre">
                          {pr.diff.split('\n').map((line, i) => {
                            const isAdded = line.startsWith('+')
                            const isRemoved = line.startsWith('-')
                            return (
                              <div key={i} className={cn(
                                "grid grid-cols-[3rem_1fr] group",
                                isAdded ? "bg-accent/10" : isRemoved ? "bg-destructive/10" : "hover:bg-muted/10"
                              )}>
                                <span className="text-muted-foreground/40 text-right pr-4 select-none">{i + 1}</span>
                                <span className={cn(
                                  isAdded ? "text-accent" : isRemoved ? "text-destructive" : "text-muted-foreground"
                                )}>
                                  {line}
                                </span>
                              </div>
                            )
                          })}
                        </pre>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          <aside className="w-96 flex flex-col bg-card/50">
            <div className="p-4 border-b">
              <h2 className="font-headline font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                AI Insights
              </h2>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {isScanning && (
                  <div className="space-y-4 scan-pulse">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="p-4 rounded-xl bg-muted/20 border border-border/50 animate-pulse">
                        <div className="h-4 w-2/3 bg-muted rounded mb-2"></div>
                        <div className="h-3 w-full bg-muted rounded mb-1"></div>
                        <div className="h-3 w-5/6 bg-muted rounded"></div>
                      </div>
                    ))}
                  </div>
                )}

                {scanResult && (
                  <>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Health Score</p>
                        <p className="text-2xl font-headline font-bold text-primary">68%</p>
                      </div>
                      <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Security</p>
                        <p className="text-2xl font-headline font-bold text-accent">Safe</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {scanResult.issues.map((issue, i) => (
                        <div key={i} className={cn(
                          "p-4 rounded-xl border transition-all",
                          issue.severity === 'critical' ? "bg-destructive/5 border-destructive/30" :
                          issue.severity === 'high' ? "bg-orange-500/5 border-orange-500/30" : "bg-muted/10 border-border/50"
                        )}>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className={cn(
                              "text-[10px] uppercase",
                              issue.type === 'security' ? "text-accent border-accent/30" : "text-primary border-primary/30"
                            )}>
                              {issue.type}
                            </Badge>
                            <Badge className={cn(
                              "text-[10px] font-bold",
                              issue.severity === 'critical' ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground"
                            )}>
                              {issue.severity}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium mb-2">{issue.description}</p>
                          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/30">
                            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 hover:bg-accent/10 hover:text-accent">
                              <MessageSquare className="w-3.5 h-3.5" /> Post Comment
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 ml-auto">
                              Ignore
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {!isScanning && !scanResult && (
                  <div className="text-center py-20 px-6">
                    <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-border/50">
                      <ShieldAlert className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-headline font-bold text-lg mb-2">Ready for analysis</h3>
                    <p className="text-sm text-muted-foreground mb-6">Trigger a scan to identify bugs, security vulnerabilities and code smells.</p>
                    <Button onClick={startScan} className="w-full bg-primary hover:bg-primary/90">
                      Run Full Scan
                    </Button>
                  </div>
                )}
              </div>
            </ScrollArea>
          </aside>
        </div>
      </main>
    </div>
  )
}
