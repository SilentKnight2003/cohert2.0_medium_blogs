import { Link, useNavigate } from "react-router-dom"
import Input from "../components/Input"
import { type LoginInput} from "@subhransujena/medium-common"
import { useState } from "react"
import Button from "../components/Button"
import { BACKEND_URL }  from "../../config"
import axios from "axios"
import Quote from "../components/Quote"
import toast from "react-hot-toast"

const Login = () => {
  const [user,setUser] = useState<LoginInput>({
        username:"",
        password:""
    })
   const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async(e:any) => {
          e.preventDefault();
          try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`,user)
            const jwt = response.data;
            localStorage.setItem("token",jwt);
            navigate("/blogs");
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          }catch(err){
              toast.error("Internal Server Error.")
          }
    }
  return (
    <div>
      <div className="grid grid-cols-1 items-center lg:grid-cols-2">
       <div>
        <div className="bg-white h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="flex flex-col items-center">
                <div className="text-3xl font-bold">Create an account</div>
                <div className=" text-gray-400 font-medium">Create an Account.<Link className="pl-2 underline" to="/signup">Signup</Link></div>
                <form onSubmit={handleSubmit}>

                    <div className="flex flex-col mt-4 gap-2">
                    
                    <Input label="Username" placeholder="Enter your username" onChange={(e)=> {
                        setUser({
                            ...user,
                            username:e.target.value
                        })
                    }}/>
                    <Input label="Password" type="password" placeholder="123456" onChange={(e)=> {
                        setUser({
                            ...user,
                            password:e.target.value
                        })
                    }}/>
                </div>
                <div>
                    <Button type="login"/>
                </div>
                        
                </form>
                
            
            </div>
            
        </div>
    </div>
       </div>
       <div className="hidden lg:block">
            <Quote/>
       </div>

    </div>
    </div>
  )
}

export default Login