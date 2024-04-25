import { useState, useMemo, createContext } from "react";
import type { OrderItem, MenuItem } from "../types";

export interface orderContextProps {
  order: OrderItem[];
  tip: number;
  subtotal: number;
  tipAmount: number;
  total: number;
  addItem: (item: MenuItem) => void;
  removeItem: (id: MenuItem['id']) => void;
  addTip: (tip: number) => void;
  placeOrder: () => void;
}

export const OrderContext = createContext<orderContextProps>({
  order: [],
  tip: 0,
  subtotal: 0,
  tipAmount: 0,
  total: 0,
  addItem: () => { },
  removeItem: () => { },
  addTip: () => { },
  placeOrder: () => { },
});

function OrderProvider({ children }: { children: React.ReactNode }) {

  //#region States

  const [order, setOrder] = useState<OrderItem[]>([]);
  const [tip, setTip] = useState<number>(0);
  const subtotal: number = useMemo(() => order.reduce((acc, item) => acc + item.price * item.quantity, 0), [order]);
  const tipAmount: number = useMemo(() => subtotal * tip, [tip, order]);
  const total: number = useMemo(() => subtotal + tipAmount, [subtotal, tipAmount]);

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

  // Add a tip to the order
  const addTip = (tip: number) => {
    setTip(tip);
  };

  // Clean order
  const placeOrder = () => {
    setOrder([]);
    addTip(0);
  }

  //#endregion

  //#region Return

  return (
    <OrderContext.Provider value={{ order, tip, subtotal, tipAmount, total, addItem, removeItem, addTip, placeOrder }}>
      {children}
    </OrderContext.Provider>
  )

  //#endregion
}

export default OrderProvider;