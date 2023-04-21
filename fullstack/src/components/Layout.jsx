import Navbar from "./layout/Navbar";


const Layout = ({ children }) => {
  return (
    <div className=" bg-black w-screen">
      <div className="container h-full mx-auto xl:px-30 px-20">
        <div className=" mx-auto w-full">
          {/* if needed add another div here for responsiveness */}
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;