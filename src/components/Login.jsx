import toast from "react-hot-toast"
import Helper from "../utility/Helper"
import { useState } from "react"
import ButtonLoader from "./ButtonLoader"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [spinner,setSpinner] = useState(false)
const navigate = useNavigate()
  const handleFrom =async(e)=>{
    e.preventDefault()
    let fromData = new FormData(e.target)
    let email =  fromData.get('email')
    if(Helper.isEmpty(email)){
      toast.error('email required !')
    }else{
      setSpinner(true)
      //api call
      let res = await axios.post(`${Helper.API_BASE}/user-login`, {UserEmail:email})
      if(res.data['msg']==='success'){
        toast.success(res.data['data'])
        sessionStorage.setItem('email',email)
        navigate('/verify')
      }else{
        toast.error('email required !')
        setSpinner(false)
      }
    }
  }
  return (
    <div>
<form onSubmit={handleFrom} className="max-w-sm mx-auto">
  <div className="mb-5">
    <label htmlFor="#" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
    <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com"  />
  </div>

  <button disabled={spinner} type="submit" className="text-white bg-red-500 focus:outline-none font-medium rounded-lg text-sm w-5/12 py-2.5 text-center  ">{spinner? <ButtonLoader/>:'submit'}</button>
</form>

    </div>
  )
}

export default Login
