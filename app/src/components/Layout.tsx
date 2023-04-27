import { useSession } from "next-auth/react";
import Navbar from "./layout/Navbar";
import { useEffect } from "react";
import { Session } from "next-auth";

type Props = {
 children :string | JSX.Element[] | JSX.Element | (() => JSX.Element)
}
const Layout = ({ children }:Props) => {
  const {data: session} = useSession()

  useEffect(() => {
    if (session) {
      localStorage.setItem('session', JSON.stringify(session))
    } else {
      localStorage.removeItem('session')
    }
  }, [session])
  return (
    <div className=" bg-black w-full">
      <div className="container  mx-auto xl:px-30 px-20">
        <div className=" mx-auto">
          <>
          <Navbar />
          {children}
          </>
        </div>
      </div>
    </div>
  )
}

export default Layout;