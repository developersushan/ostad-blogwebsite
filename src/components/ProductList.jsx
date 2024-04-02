import { useEffect, useState } from "react"
import axios from "axios"
import Helper from "../utility/Helper"
import FullScreenLoader from "../components/FullScreenLoader"
import toast from "react-hot-toast"
const ProductList = () => {
  const [productList,setProductList] = useState(null)
  const [loader,setLoader] = useState(false)
  useEffect(()=>{
    (async()=>{
     await  ProductAPiCall()
    })()
  },[])

  const ProductAPiCall =async()=>{
   let res = await axios.get(`${Helper.API_BASE}/product-list`)
   let productListData =  res.data['data']
   setProductList(productListData)
  }


  const handleAddToCart =async(id)=>{
    try{
      setLoader(true)
      let res = await axios.get(`${Helper.API_BASE}/create-cart/${id}`, Helper.headerToken())
      setLoader(false)
      if(res.data['msg']==='success'){
        toast.success('added cart list to product')
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
                    <img src={item['image']} width={400} height={400} alt="" />
                    <div className="text-left px-3 py-4">
                    <h3>{item['title']}</h3>
                    <h5>price: {item['discount']===0? <p>{item['price']}</p>:<p><strike>{item['price']}</strike> {item['discount_price']} </p>}</h5>
                    </div>
                    {Helper.isLogin() &&
                    <button onClick={()=>handleAddToCart(item['id'])} className="text-sm bg-red-500 w-full py-2 hover:bg-green-400 rounded text-white">ADD TO CART</button>
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

export default ProductList
