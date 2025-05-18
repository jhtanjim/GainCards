import StatusBadge from './StatusBadge'

const OrderRow = ({ order }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{order.id}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.vendorProfileId}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">${order.totalAmount.toFixed(2)}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.paymentStatus}</td>
    <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={order.status} /></td>
  </tr>
)

export default OrderRow
