import useOrder from "../hooks/useOrder"

const tipOptions = [
  {
    id: 'tip-10',
    value: .10,
    label: '10%'
  },
  {
    id: 'tip-20',
    value: .20,
    label: '20%'
  },
  {
    id: 'tip-50',
    value: .50,
    label: '50%'
  },
]

export default function TipPercantageForm() {
  const { addTip, tip } = useOrder()
  return (
    <div>
      <h3 className="font-black text-2xl text-teal-950">Propina:</h3>
      <form>
        {tipOptions.map((option) => (
          <div key={option.id} className="flex gap-2">
            <label htmlFor={option.id}>{option.label}</label>
            <input
              type="radio"
              name="tip"
              id={option.id}
              value={option.value}
              checked={tip === option.value}
              onChange={(e) => addTip(+e.target.value)}
            />
          </div>
        ))}
        <div></div>
      </form>
    </div>
  )
}
