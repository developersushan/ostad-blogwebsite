import { useEffect, useState } from "react"
import axios from "axios"
import Helper from "../utility/Helper"
import FullScreenLoader from "../components/FullScreenLoader"
import toast from "react-hot-toast"
const CartList = () => {

  const [productList,setProductList] = useState(null)
  const [loader,setLoader] = useState(false)
  useEffect(()=>{
    (async()=>{
     await  ProductAPiCall()
    })()
  },[])

  const ProductAPiCall =async()=>{
   let res = await axios.get(`${Helper.API_BASE}/cart-list`, Helper.headerToken())
   let productListData =  res.data['data']
   setProductList(productListData)
  }

  const handleRemoveCart =async(id)=>{
    try{
      setLoader(true)
      let res = await axios.get(`${Helper.API_BASE}/remove-cart/${id}`, Helper.headerToken())
      setLoader(false)
      if(res.data['msg']==='success'){
        toast.success('product delete successfully')
     await  ProductAPiCall()
      }else{
        toast.error('add to cart fail!')
      }
    }catch(e){
      Helper.Unauthorized(e.response.status)
    }
  }
  return (
    <div>
            {productList==null||loader ?<FullScreenLoader/>:
            <div className="grid xxl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2  gap-2">
            {
              productList?.map((item)=>{
                return(
                  <div className="shadow-xl py-3 px-4 rounded" key={item.id}>
                    <img src={item['product']['image']} width={400} height={400} alt="" />
                    <div className="text-left px-3 py-4">
                    <h3>{item['product']['title']}</h3>
                    <h5>price: {item['product']['discount']===0? <p>{item['product']['price']}</p>:<p><strike>{item['product']['price']}</strike> {item['product']['discount_price']} </p>}</h5>
                    </div>
                    {Helper.isLogin() &&
                    <button onClick={()=>handleRemoveCart(item['product']['id'])} className="text-sm bg-red-500 w-full py-2 hover:bg-green-400 rounded text-white">Remove</button>
                    }
                  </div>
                )
              })
            }
          </div>
      }
    </div>
  )
}

export default CartList
