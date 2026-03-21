import type { ChangeEvent } from "react"

interface LabelInputType {
    label:string,
    placeholder:string,
    type?:string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const Input = ({label,placeholder,onChange,type}:LabelInputType) => {
  return (
    <div>
        <div className="w-88">
            <label className="block mb-2.5 text-sm font-medium text-heading">{label}</label>
            <input onChange={onChange} type={type} id="user_name" className="bg-neutral-secondary-medium border border-gray-300 rounded-md border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder={placeholder} required />
        </div>
    </div>
  )
}

export default Input