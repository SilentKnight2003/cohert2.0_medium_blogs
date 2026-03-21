interface PropType{
  type:string
}
const Button = ({type}:PropType) => {
  return (
    <div className="w-88 mt-4">
      <button type="submit" className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white transform transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer">{type === "signup" ? "Sign Up" : "Log In"}</button>
    </div>
    
  )
}

export default Button