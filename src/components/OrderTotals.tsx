import useOrder from "../hooks/useOrder";
import { formatCurrency } from "../helpers";

export default function OrderTotals() {
  const { subtotal, tipAmount, total, placeOrder } = useOrder();
  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl text-teal-950">Totales y Propinas</h2>
        <p>
          Subtotal a pagar: {''}
          <span className="font-bold">{formatCurrency(subtotal)}</span>
        </p>

        <p>
          Propina: {''}
          <span className="font-bold">{formatCurrency(tipAmount)}</span>
        </p>

        <p>
          Total a pagar: {''}
          <span className="font-bold">{formatCurrency(total)}</span>
        </p>
      </div>

      <button
        className="w-full bg-teal-900 hover:bg-teal-950 p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
        disabled={total === 0}
        onClick={() => placeOrder()}
      >
        Guardar Orden
      </button>
    </>
  )
}
