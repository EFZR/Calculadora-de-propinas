import { useContext } from "react";
import { OrderContext, orderContextProps } from "../context/orderProvider";

function useOrder(): orderContextProps {
  return useContext(OrderContext);
}

export default useOrder;
