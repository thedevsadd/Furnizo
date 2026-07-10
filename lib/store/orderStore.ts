import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order } from "@/types";

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (orderId: string) => Order | undefined;
  cancelOrder: (orderId: string) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },
      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },
      cancelOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status: "Cancelled" } : order
          ),
        }));
      },
    }),
    {
      name: "furnizo-order-store",
    }
  )
);

export function getOrderStatus(order: Order): string {
  if (order.status === "Cancelled") return "Cancelled";

  const elapsedMs = Date.now() - new Date(order.date).getTime();
  const elapsedMin = elapsedMs / (1000 * 60);

  if (elapsedMin < 1) return "Order Received";
  if (elapsedMin < 2) return "Stock Cleared";
  if (elapsedMin < 3) return "Order Confirmed";
  if (elapsedMin < 5) return "Way to Packaging";
  if (elapsedMin < 120) return "Packaged"; // 2 hours
  return "Out for Delivery";
}

export function getExpectedDeliveryDate(orderDateStr: string): string {
  const date = new Date(orderDateStr);
  date.setDate(date.getDate() + 5);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
