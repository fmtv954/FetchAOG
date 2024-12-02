import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface LastAOGEventPopupProps {
  isOpen: boolean
  onClose: () => void
  event: {
    date: string
    timeAOGDeclared: string
    duration: string
    reason: string
    impact: string
    resolution: string
  }
}

export function LastAOGEventPopup({ isOpen, onClose, event }: LastAOGEventPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Last AOG Event Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Date</p>
            <p>{event.date}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Time AOG Declared</p>
            <p>{event.timeAOGDeclared}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Duration</p>
            <p>{event.duration}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Reason</p>
            <p>{event.reason}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Impact</p>
            <p>{event.impact}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Resolution</p>
            <p>{event.resolution}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Status</p>
            <Badge variant="success">Resolved</Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

