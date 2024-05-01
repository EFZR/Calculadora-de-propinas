import { useReducer, useMemo, createContext } from "react";
import { orderReducer, initialState } from "../reducer/order-reducer";
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

  const [state, dispatch] = useReducer(orderReducer, initialState);
  const subtotal: number = useMemo(() => state.order.reduce((acc, item) => acc + item.price * item.quantity, 0), [state.order]);
  const tipAmount: number = useMemo(() => subtotal * state.tip, [state.tip, state.order]);
  const total: number = useMemo(() => subtotal + tipAmount, [subtotal, tipAmount]);

  //#endregion

  //#region Functions

  // Add an item to the order
  const addItem = (item: MenuItem) => {
    dispatch({ type: "add-item", payload: { item } });
  };

  // Remove an item from the order
  const removeItem = (id: MenuItem['id']) => {
    dispatch({ type: "remove-item", payload: { id } });
  };

  // Add a tip to the order
  const addTip = (tip: number) => {
    dispatch({ type: "add-tip", payload: { tip } });
  };

  // Clean order
  const placeOrder = () => {
    dispatch({ type: "place-order" });
  }

  //#endregion

  //#region Return

  return (
    <OrderContext.Provider value={{ order: state.order, tip: state.tip, subtotal, tipAmount, total, addItem, removeItem, addTip, placeOrder }}>
      {children}
    </OrderContext.Provider>
  )

  //#endregion
}

export default OrderProvider;