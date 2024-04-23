import { useMemo, useState } from "react";
import type { OrderItem, MenuItem } from "../types";

export default function useOrder() {

  //#region States

  const [order, setOrder] = useState<OrderItem[]>([]);
  const subtotal: number = useMemo(() => order.reduce((acc, item) => acc + item.price * item.quantity, 0), [order]);

  //#endregion

  //#region Functions

  // Add an item to the order
  const addItem = (item: MenuItem) => {
    const itemExists = order.find((orderItem) => orderItem.id === item.id);

    // If the item already exists in the order, update the quantity
    if (itemExists) {
      const updateOrder = order.map((item) =>
        item.id === itemExists.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setOrder(updateOrder);
    }

    // If the item does not exist in the order, add it
    else {
      const newItem: OrderItem = { ...item, quantity: 1 };
      setOrder((prevState) => [...prevState, newItem]);
    }
  };

  // Remove an item from the order
  const removeItem = (id: MenuItem['id']) => {
    const updateOrder = order.filter((item) => item.id !== id);
    setOrder(updateOrder);
  };

  //#endregion

  //#region Return

  return {
    order,
    subtotal,
    addItem,
    removeItem,
  };

  //#endregion
}
