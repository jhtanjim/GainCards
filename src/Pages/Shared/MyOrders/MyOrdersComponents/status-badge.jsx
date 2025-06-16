import { getStatusBadgeClass } from "./utils status-utils";



export function StatusBadge({ status }) {
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(status)}`}>{status}</span>
}
