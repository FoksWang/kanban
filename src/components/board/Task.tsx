import { Card, CardContent } from '@/components/ui/card'

export interface TaskProps {
  title: string
}

export const Task = (props: TaskProps) => {
  return (
    <Card
      aria-label={props.title}
      className="shadow-sm transition-shadow hover:shadow-md"
      role="article"
    >
      <CardContent>
        <h3 className="text-sm leading-6 font-medium wrap-break-word">{props.title}</h3>
      </CardContent>
    </Card>
  )
}
