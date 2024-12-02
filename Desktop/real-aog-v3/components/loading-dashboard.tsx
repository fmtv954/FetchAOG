import { Skeleton } from "@/components/ui/skeleton"

export function LoadingDashboard() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-[120px]" />
        <Skeleton className="h-[120px]" />
        <Skeleton className="h-[120px]" />
        <Skeleton className="h-[120px]" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-[400px] col-span-2" />
        <Skeleton className="h-[400px]" />
      </div>
    </div>
  )
}

