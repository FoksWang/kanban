import { SquareCheck } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export interface TaskProps {
  title: string
}

export const Task = (props: TaskProps) => {
  return (
    <Card
      aria-label={props.title}
      className="min-h-44 gap-3 rounded-lg border border-border/80 shadow-xs ring-0 transition-shadow hover:shadow-sm"
      role="article"
    >
      <CardHeader>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <SquareCheck aria-hidden="true" className="size-3.5 text-blue-500" />
          Task
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <h3 className="text-sm leading-6 font-semibold wrap-break-word text-card-foreground">
          {props.title}
        </h3>
      </CardContent>
    </Card>
  )
}
