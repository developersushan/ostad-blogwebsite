import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Helper from "../utility/Helper"
import axios from "axios"

const VerifyLogin = () => {
  const [spinner,setSpinner] = useState(false)
  const navigate = useNavigate()
    const handleFrom =async(e)=>{
      e.preventDefault()
      let fromData = new FormData(e.target)
      let otp =  fromData.get('otp')
      if(Helper.isEmpty(otp)){
        toast.error('email required !')
      }else{
        setSpinner(true)
        //api call
        let email = sessionStorage.getItem('email')
        let res = await axios.post(`${Helper.API_BASE}/verify-login`, {UserEmail:email,OTP:otp})
        if(res.data['msg']==='success'){
          // toast.success(res.data['data'])
          sessionStorage.setItem('token',res.data['data'])
          window.location.href="/"
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
    <label htmlFor="#" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">verification email</label>
    <input type="text" id="email" name="otp" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="verify@gmail.com"  />
  </div>

  <button disabled={spinner} type="submit" className="text-white bg-red-500 focus:outline-none font-medium rounded-lg text-sm w-5/12 py-2.5 text-center  ">{spinner? <ButtonLoader/>:'submit'}</button>
</form>

    </div>
  )
}

export default VerifyLogin
