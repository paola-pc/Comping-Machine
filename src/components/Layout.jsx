import { useSession } from "next-auth/react";
import Navbar from "./layout/Navbar";
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
    <div className="bg-black mx-auto w-full flex flex-col items-center">
      <div className="px-10">
          <Navbar />
          {children}
        
      </div>
    </div>
  )
}

export default Layout;