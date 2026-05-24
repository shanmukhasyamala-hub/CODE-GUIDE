
"use client"

import { MainNav } from "@/components/layout/main-nav"
import { MOCK_PRS } from "@/app/lib/mock-data"
import { BentoCard } from "@/components/dashboard/bento-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GitPullRequest, Search, Filter, ArrowRight, Github } from "lucide-react"
import Link from "next/link"

export default function ReviewsPage() {
  return (
    <div className="flex min-h-screen">
      <MainNav />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-headline font-bold mb-2 text-primary">Pull Requests</h1>
            <p className="text-muted-foreground">Monitor and manage AI-driven code reviews across your repositories.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Github className="w-4 h-4" /> Connect Repository
          </Button>
        </header>

        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by title, author, or PR ID..." 
              className="pl-10 bg-card border-border/50"
            />
          </div>
          <Button variant="outline" className="gap-2 border-border/50">
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {MOCK_PRS.map((pr) => (
            <BentoCard key={pr.id} title="" className="hover:border-primary transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
                    <GitPullRequest className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold font-headline">{pr.title}</h3>
                      <Badge variant="outline" className="text-[10px] font-mono border-border/50">{pr.id}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-primary/20" /> {pr.author}
                      </span>
                      <span>•</span>
                      <span className="font-mono">{pr.repository}</span>
                      <span>•</span>
                      <span>Updated 2 hours ago</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 px-4 border-l border-border/50">
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Health</p>
                    <p className={cn(
                      "text-xl font-headline font-bold",
                      pr.healthScore > 90 ? "text-accent" : 
                      pr.healthScore > 70 ? "text-primary" : "text-destructive"
                    )}>
                      {pr.healthScore > 0 ? pr.healthScore : '--'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Status</p>
                    <Badge className={cn(
                      "capitalize",
                      pr.status === 'cleared' ? "bg-accent/10 text-accent border-accent/20" :
                      pr.status === 'issues_found' ? "bg-destructive/10 text-destructive border-destructive/20" :
                      "bg-muted/10 text-muted-foreground border-muted/20"
                    )}>
                      {pr.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <Link href={`/reviews/${pr.id}`}>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/20 hover:text-primary rounded-full transition-all">
                      <ArrowRight className="w-6 h-6" />
                    </Button>
                  </Link>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      </main>
    </div>
  )
}

import { cn } from "@/lib/utils"
