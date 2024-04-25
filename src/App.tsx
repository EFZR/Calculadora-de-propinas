import { MENUITEMS } from "./data"
import MenuItem from "./components/MenuItem"
import OrderContents from "./components/OrderContents"
import OrderTotals from "./components/OrderTotals"
import TipPercantageForm from "./components/TipPercantageForm"
import useOrder from "./hooks/useOrder"

function App() {
  const { order } = useOrder()
  return (
    <>
      <header className="bg-teal-400 py-5">
        <h1 className="text-center text-4xl text-teal-950 font-black">Calculadora de Propinas y Consumo</h1>
      </header>

      <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl text-teal-950 font-black">Menú</h2>
          <div className="space-y-3 mt-10">
            {
              MENUITEMS.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))
            }
          </div>

        </div>
        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {
            order.length > 0 ? (
              <>
                <OrderContents />
                <TipPercantageForm />
                <OrderTotals />
              </>
            ) : (
              <p className="text-center">Orden vacia</p>
            )
          }
        </div>
      </main>
    </>
  )
}

export default App
