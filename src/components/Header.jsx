import { Link } from "react-router-dom"
import Helper from "../utility/Helper"
import Logo from '../assets/gift-shopping-logo-icon-design-vector-22925710-removebg-preview.png'
const Header = () => {

  const handleLogOut =()=>{
    sessionStorage.clear()
    window.location.href='/'
  }
  return (
    <div>
<nav className="bg-white border-gray-200 dark:bg-white">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={Logo} className="w-40 h-36" alt="shopping Logo"  height={200} />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">SHOP</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-100 md:dark:bg-gray-100 dark:border-gray-700">
        <li>
          <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        {
          Helper.isLogin() && 
          <li>
          <a href="/cart-list" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Cart List</a>
          </li>
        }
        {
          Helper.isLogin() ?<button onClick={handleLogOut} className="text-white bg-red-500 px-4 py-2 rounded">LogOut</button> :<Link to='/login' className="text-white bg-red-500 px-4 py-2 rounded">Login</Link>
        }
        
      </ul>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Header
