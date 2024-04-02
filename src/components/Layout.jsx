import Header from "./Header"
import Footer from './Footer';
import { Toaster } from "react-hot-toast";

const Layout = (props) => {
  return (
    <div>
      <Header/>
      {props.children}
      <Toaster position="top-center" />
      <Footer/>
    </div>
  )
}

export default Layout
