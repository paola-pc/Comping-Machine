import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai"
import Button from "./Button";
import { signIn } from 'next-auth/react';
import { useState } from "react";

const Modal = ({ isOpen, onClose, action, title, actionLabel, disabled, setData }) => { //scf
  const [formData, setFormData] = useState({
    sName: '' //session name
  })

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    onClose();
  }, [disabled, onClose])

  const handleClick = () => {
    try {
      signIn('google');
    } catch (error) {
      console.log(error)
    } finally {
      return <div className="text-fuchsia-100">Oops... Something went wrong</div>
    }
  }

  const handleChange = useCallback((e) => {
    setFormData({ sName: e.target.value });
    setData(formData.sName)
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData) 
    action()
    onClose();
    setFormData({sName: ''})
  }

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
            px-10
            pt-10
            pb-5
            rounded-t
          ">
              <h3 className="text-3xl font-semibold text-white">{title}</h3>
              <button
                onClick={handleClose}
                className="p-1 ml-auto border-0 text-white hover:opacity-70 transition self-end"
              ><AiOutlineClose size={20} />
              </button>
            </div>

            {actionLabel === 'Save' ?
              <div className="px-10 text-fuchsia-200 flex flex-col gap-2 ">
                <form onSubmit={(e) => handleSubmit(e)} >
                  <label>Session Name:
                    <div></div>
                    <input name="sName" type="text" value={formData.sName}
                      onChange={(e) => handleChange(e)}
                      className="text-fuchsia-900 bg-fuchsia-100 rounded"
                    />
                  </label>
                  <div className="flex flex-col gap-2 p-10">
                  <button type="submit">SAVE</button>
                  </div>
                </form>
              </div>
              
              :
              <div className="flex flex-col gap-2 p-10" >
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  fullWidth
                  large
                  onClick={() => handleClick()}
                />
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal;