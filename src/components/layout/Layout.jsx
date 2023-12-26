import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const session = useSession()

  useEffect(() => {
    if (session) {
      localStorage.setItem('session', JSON.stringify(session))
    } else {
      localStorage.removeItem('session')
    }
  }, [session])
  
  return (
    <div id="layout-container" className="bg-black mx-auto w-[97vw] flex flex-col items-center px-10 gap-1">
          <Navbar />
          {children}
    </div>
  )
}

export default Layout;