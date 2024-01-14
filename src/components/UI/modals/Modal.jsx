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
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', left: '0', top: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        className=" overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div className="relative w-[600px]">
          {/* Content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none py-10 px-10">

            {/* Header */}
            <div className="h-30 flex items-center justify-between  mb-5 rounded-t relative">
              <h3 className="text-3xl font-semibold text-white">{title}</h3>
              <button
                onClick={handleClose}
                className="p-1 ml-auto border-0 text-white hover:opacity-70 transition self-end absolute top-0 right-0"
              ><AiOutlineClose size={20} />
              </button>
            </div>

            {/* Body */}

            <div className={`h-30 text-fuchsia-100 ${(description || FormInputs) ? 'pb-5' : ''}`}>
              {description && (<p> {description}</p>)}
              {FormInputs && (<div key={"modal-form-container"}>{FormInputs}</div>)}
            </div>


            {/* Footer */}
            {mainActionLabel && <div className="flex flex-col h-30 justify-center">
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