import type { OrderItem, MenuItem } from "../types";

export type ActivityActions =
  | { type: "add-item"; payload: { item: MenuItem } }
  | { type: "remove-item"; payload: { id: MenuItem["id"] } }
  | { type: "add-tip"; payload: { tip: number } }
  | { type: "place-order" };

export type ActivityState = {
  order: OrderItem[],
  tip: number,
};

export const initialState: ActivityState = {
  order: [],
  tip: 0,
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "add-item") {
    const itemExists = state.order.find(
      (orderItem) => orderItem.id === action.payload.item.id
    );
    let updateOrder: OrderItem[] = [];

    // If the item already exists in the order, update the quantity
    if (itemExists) {
      updateOrder = state.order.map((item) =>
        action.payload.item.id === itemExists.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    // If the item does not exist in the order, add it
    else {
      const newItem: OrderItem = { ...action.payload.item, quantity: 1 };
      updateOrder = [...state.order, newItem];
    }

    return {
      ...state,
      order: updateOrder,
    };
  }

  if (action.type === "remove-item") {
    const updateOrder = state.order.filter(
      (item) => item.id !== action.payload.id
    );
    return {
      ...state,
      order: updateOrder,
    };
  }

  if (action.type === "add-tip") {
    return {
      ...state,
      tip: action.payload.tip,
    };
  }

  if (action.type === "place-order") {
    return {
      ...state,
      order: [],
      tip: 0,
    };
  }

  return state
};
