import { Loader2 } from "lucide-react"

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
      <h3 className="text-lg font-medium text-gray-900">Loading your orders...</h3>
    </div>
  )
}
