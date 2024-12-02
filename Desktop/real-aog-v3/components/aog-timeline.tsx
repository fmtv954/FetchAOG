import { Badge } from "@/components/ui/badge"

interface TimelineEvent {
  title: string
  subtitle: string
  time: string
  timeLabel: string
  status?: string
  isCompleted?: boolean
}

interface AOGTimelineProps {
  events: TimelineEvent[]
  progress: number
}

export function AOGTimeline({ events, progress }: AOGTimelineProps) {
  return (
    <div className="relative space-y-4 p-6 rounded-xl bg-gradient-to-r from-white to-blue-50 dark:from-gray-900 dark:to-blue-950 border">
      {/* Timeline Track */}
      <div className="absolute left-[45px] top-0 bottom-0 w-px bg-gradient-to-b from-orange-500 via-blue-500 to-teal-500 rounded-full" />
      
      {/* Progress Indicator */}
      <div 
        className="absolute left-[45px] top-0 w-px bg-primary rounded-full transition-all duration-500 ease-in-out"
        style={{ height: `${progress}%` }}
      />

      {/* Events */}
      <div className="space-y-8">
        {events.map((event, index) => (
          <div key={index} className="relative pl-16">
            {/* Timeline Node */}
            <div className={`
              absolute left-10 top-1 size-4 rounded-full border-2 
              ${event.isCompleted 
                ? 'bg-primary border-primary' 
                : 'bg-background border-muted-foreground'
              }
              transform -translate-x-1/2
            `}>
              {/* Connecting Line */}
              <div className="absolute top-4 left-1/2 h-8 w-px bg-border -translate-x-1/2" />
            </div>

            {/* Content */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium leading-none">{event.title}</h4>
                  {event.status && (
                    <Badge variant={event.isCompleted ? "default" : "secondary"}>
                      {event.status}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{event.subtitle}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{event.time}</p>
                <p className="text-sm text-muted-foreground">{event.timeLabel}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

