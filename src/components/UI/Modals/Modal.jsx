import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai"
import Button from "../Button";

const Modal = ({ isOpen, onClose, mainAction, title, mainActionLabel, mainActionIcon, disabled, description, FormInputs, children }) => {
  const handleClose = useCallback(() => {
    if (disabled) return;
    onClose();
  }, [disabled, onClose])

  if (!isOpen) return null;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div className="relative lg:w-3/6 my-6 mx-auto md:min-w-[50%] lg:max-w-3xl lg:h-auto">
          {/* Content */}
          <div className="lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">

            {/* Header */}
            <div className="flex items-center justify-between px-10 pt-10 pb-5 rounded-t">
              <h3 className="text-3xl font-semibold text-white">{title}</h3>
              <button
                onClick={handleClose}
                className="p-1 ml-auto border-0 text-white hover:opacity-70 transition self-end"
              ><AiOutlineClose size={20} />
              </button>
            </div>

            {/* Body */}

            <div className={`text-fuchsia-100 px-10 ${(description || FormInputs) ? 'pb-5' : ''}`}>
              {description && (<p> {description}</p>)}
              {FormInputs && (<div key={"modal-form-container"}>{FormInputs}</div>)}
            </div>


            {/* Footer */}
            {mainActionLabel && <div className="flex flex-col h-[120px] gap-2 px-10">
              {FormInputs ? (
                <Button
                  label={mainActionLabel}
                  fullWidth
                  type="submit"
                  icon={mainActionIcon}
                />
              ) : (
                <Button
                  label={mainActionLabel}
                  fullWidth
                  onClick={mainAction}
                  icon={mainActionIcon}
                />
              )
              }
            </div>}

            { /* RENDER DUMB MODAL */}
            {children && children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal;