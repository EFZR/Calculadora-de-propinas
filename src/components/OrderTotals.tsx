import useOrder from "../hooks/useOrder";
import { formatCurrency } from "../helpers";

export default function OrderTotals() {
  const { subtotal } = useOrder();
  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y Propinas</h2>
        <p>
          Subtotal a pagar: {''}
          <span className="font-bold">{formatCurrency(subtotal)}</span>
        </p>

        <p>
          Propina: {''}
          <span className="font-bold">$0</span>
        </p>

        <p>
          Total a pagar: {''}
          <span className="font-bold">$0</span>
        </p>
      </div>

      <button></button>
    </>
  )
}
