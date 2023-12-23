import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai"
import Button from "../Button";
import { useState } from "react";
import { useRouter } from "next/router";


const LoadingModal = ({ isOpen }) => {
  if (!isOpen) return null; 
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div
          className="text-fuchsia-400 inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">

        </div>
      </div>
    </>
  )
}

export default LoadingModal;