import { OrderHeader } from "./order-header"
import { OrderItem } from "./order-item"

export function OrderCard({
  orderGroup,
  expandedOrderId,
  showShareMenu,
  onToggleExpand,
  onToggleShareMenu,
  onShare,
  onCardClick,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
      <OrderHeader
        orderGroup={orderGroup}
        showShareMenu={showShareMenu}
        onToggleShareMenu={onToggleShareMenu}
        onShare={onShare}
        onCardClick={onCardClick}
      />

      <div className="divide-y divide-gray-200">
        {orderGroup.orders.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
            isExpanded={expandedOrderId === order.id}
            onToggleExpand={onToggleExpand}
          />
        ))}
      </div>
    </div>
  )
}
