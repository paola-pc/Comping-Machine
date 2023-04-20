import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import Button from "./Button";
import { useSession, signIn, signOut } from 'next-auth/react';

const Modal = ({ isOpen, onClose, onLogin, title, body, footer, actionLabel, disabled }) => { //scf
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    onClose();
  }, [disabled, onClose])

  const handleLogin = useCallback(() => {
    if (disabled) {
      return;
    }
    onLogin()
  }, [disabled, onLogin])

  // If the modal is closed don't return content
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="
        justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-neutral-800
        bg-opacity-70
        
      ">
        {/* responsive madness happening down here: */}
        <div className="
          relative
          lg:w-3/6
          my-6
          mx-auto
          md:min-w-[50%]
          lg:max-w-3xl
          lg:h-auto
        ">
          {/*Content*/}
          <div className="
            h-full
            lg:h-auto
            border-0
            rounded-lg
            shadow-lg
            relative
            flex
            flex-col
            w-full
            bg-black
            outline-none
            focus:outline-none
            ">

            {/* header */}
            <div className="
            flex
            items-center
            justify-between
            p-10
            rounded-t
          ">
              <h3 className="text-3xl font-semibold text-white">{title}</h3>
              <button
                onClick={handleClose}
                className="p-1 ml-auto border-0 text-white hover:opacity-70 transition self-end"
              ><AiOutlineClose size={20} />
              </button>
            </div>
              {/* footer */}
              <div className="flex flex-col gap-2 p-10" >
              <Button disabled={disabled}
                label={actionLabel}
                icon={FcGoogle}
                fullWidth
                large
                onClick={() => signIn('google')}
              />
              {footer}
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal;