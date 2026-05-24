
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface BentoCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

export function BentoCard({ title, subtitle, children, className, icon }: BentoCardProps) {
  return (
    <Card className={cn("overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h3 className="font-headline font-semibold text-lg flex items-center gap-2">
              {icon && <span className="text-accent">{icon}</span>}
              {title}
            </h3>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        <div>{children}</div>
      </div>
    </Card>
  )
}
