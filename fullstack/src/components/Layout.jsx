import Navbar from "./layout/Navbar";


const Layout = ({ children }) => {
  return (
    <div className="h-screen bg-black">
      <div className="container h-full mx-auto xl:px-30 max-w-xl">
        <div className="grid grid-rows-3 w-full">
          {/* if needed add another div here for responsiveness */}
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;