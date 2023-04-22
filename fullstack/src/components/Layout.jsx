import Navbar from "./layout/Navbar";


const Layout = ({ children }) => {
  return (
    <div className=" bg-black w-full">
      <div className="container  mx-auto xl:px-30 px-20">
        <div className=" mx-auto">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;