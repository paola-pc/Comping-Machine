import { NextPage } from "next";
import ConfigMachine from "../components/machines/ConfigMachine";


const Home = () => {

  return (
    <div className="container flex flex-col items-center justify-center w-full">
      <ConfigMachine />
    </div>
  )
}

export default Home
