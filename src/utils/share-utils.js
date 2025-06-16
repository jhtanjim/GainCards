export function generateShareContent(orderGroup) {
if (!orderGroup || !orderGroup.orders || orderGroup.orders.length === 0) {
return {
shareText: "🃏 Check out my card purchase!",
shareUrl: window?.location?.origin || "",
productImage: null,
};
}

const orderSummary = orderGroup.orders[0];
const itemCount = orderGroup.orders.reduce(
(total, order) => total + (order.items ? order.items.length : 0),
0
);

const firstItem = orderSummary?.items?.[0];
const firstProduct = firstItem?.product?.title || "Card";
const productImage = firstItem?.product?.frontImageUrl || null;
const totalAmount = orderGroup.totalAmount || 0;
const orderId = orderGroup.id ? orderGroup.id.substring(0, 8) : "Unknown";
const status = orderGroup.status || "Processing";

const shareText = `🃏 I just bought this card! ${firstProduct}${itemCount > 1 ? ` and ${itemCount - 1} more cards` : ""} for $${totalAmount.toFixed(2)}. Order #${orderId} - Status: ${status} 📦`;

const shareUrl = `${window?.location?.origin || ""}/orders/${orderGroup.id || ""}`;

return { shareText, shareUrl, productImage };
}

export async function createShareImageBlob(orderGroup) {
const screenWidth = window.innerWidth;
const canvasWidth = Math.min(600, screenWidth - 40);
const canvasHeight = (canvasWidth / 3) * 2; // maintain 3:2 ratio
const scale = canvasWidth / 600; // based on original 600 width

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
if (!ctx) return null;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "#f8fafc");
gradient.addColorStop(1, "#e2e8f0");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

const orderSummary = orderGroup?.orders?.[0];
const firstProduct = orderSummary?.items?.[0]?.product;

if (firstProduct?.frontImageUrl) {
try {
const img = new Image();
img.crossOrigin = "anonymous";
       return new Promise((resolve) => {
    img.onload = () => {
      const imgWidth = 200 * scale;
      const imgHeight = 280 * scale;
      const imgX = 50 * scale;
      const imgY = 60 * scale;

      ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
      ctx.shadowBlur = 10 * scale;
      ctx.shadowOffsetX = 5 * scale;
      ctx.shadowOffsetY = 5 * scale;

      ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 3 * scale;
      ctx.strokeRect(imgX, imgY, imgWidth, imgHeight);

      ctx.fillStyle = "#1e293b";
      ctx.font = `bold ${28 * scale}px Arial`;
      ctx.fillText("🃏 Just Bought This Card!", 280 * scale, 100 * scale);

      ctx.font = `bold ${22 * scale}px Arial`;
      ctx.fillStyle = "#0f172a";
      ctx.fillText(firstProduct?.title || "Trading Card", 280 * scale, 140 * scale);

      ctx.font = `${18 * scale}px Arial`;
      ctx.fillStyle = "#475569";
      ctx.fillText(`Brand: ${firstProduct?.brand || "N/A"}`, 280 * scale, 170 * scale);
      ctx.fillText(`Grade: ${firstProduct?.grade || "N/A"}`, 280 * scale, 195 * scale);

      if (firstProduct?.cardNumber) {
        ctx.fillText(`Card #${firstProduct.cardNumber}`, 280 * scale, 220 * scale);
      }

      ctx.fillStyle = "#10b981";
      ctx.fillRect(275 * scale, 235 * scale, 150 * scale, 35 * scale);
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${24 * scale}px Arial`;
      ctx.fillText(`$${(orderGroup?.totalAmount || 0).toFixed(2)}`, 285 * scale, 258 * scale);

      ctx.font = `${16 * scale}px Arial`;
      ctx.fillStyle = "#64748b";
      ctx.fillText(`Order #${(orderGroup?.id || "").substring(0, 8)}`, 280 * scale, 290 * scale);
      ctx.fillText(`Status: ${orderGroup?.status || "Processing"}`, 280 * scale, 315 * scale);

      ctx.font = `${14 * scale}px Arial`;
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("Shared from GainCards", 280 * scale, 350 * scale);

      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/png",
        0.9
      );
    };

    img.onerror = () => {
      resolve(null);
    };

    img.src = firstProduct.frontImageUrl;
  });
} catch (error) {
  console.error("Error creating share image:", error);
  return null;
}
}

return null;
}

export async function downloadShareImage(orderGroup) {
  const imageBlob = await createShareImageBlob(orderGroup);

if (imageBlob) {
const url = URL.createObjectURL(imageBlob);
const a = document.createElement("a");
a.href = url;
a.download = `card-purchase-${(orderGroup?.id || "order").substring(0, 8)}.png`;
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(url);
} else {
throw new Error("Failed to create image");
}}