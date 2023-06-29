import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai"
import Button from "./Button";
import { signIn } from 'next-auth/react';
import { useState } from "react";
import { useRouter } from "next/router";
import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({ isOpen, onClose, action, title, actionLabel, disabled, setData }) => { //scf
  const [formData, setFormData] = useState({
    sName: '', //session name
  })
  const router = useRouter();

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

  const handleLoginGitHub = () => {
    try {
      signIn('github')
    } catch (error) {
      console.log(error)
    } finally {
      return <div className="text-fuchsia-100">Oops... Something went wrong</div>
    }
  }

  const handleChange = (e) => {
    setFormData({ sName: e.target.value });
    setData(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    action()
    onClose();
    setFormData({ sName: '' })
  }

  const handleDeleteSession = () => {
    action();
    onClose();
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

            {actionLabel === 'Save' &&
              <div className="px-10 text-fuchsia-200 flex flex-col gap-2 ">
                <form onSubmit={(e) => handleSubmit(e)} >
                  <label>Session Name:
                    <br></br>
                    <input name="sName" type="text" value={formData.sName}
                      onChange={(e) => handleChange(e)}
                      className="text-fuchsia-900 bg-fuchsia-100 rounded"
                    />
                  </label>
                  <div className="flex flex-col h-[120px] gap-2 p-10">
                    <Button
                      label={actionLabel}
                      fullWidth
                      large
                      type='submit'
                    />
                  </div>
                </form>
              </div>
            }
            {actionLabel === 'Delete Permanently' &&
              <>
                <p className="text-fuchsia-200 px-10">Do you want to delete this session permanently? This action cannot be undone.</p>
                <div className="flex flex-col h-[120px] gap-2 p-10">
                  <Button
                    disabled={false}
                    label={actionLabel}
                    fullWidth
                    onClick={() => handleDeleteSession()}
                  />
                </div>
              </>
            }

            {actionLabel === 'Turn the Phone' &&
              <>
                <p className="text-fuchsia-200 px-10">We suggest you to rotate your phone 90 degrees or make this window wider!</p>
                <div className="rotate-90-cw flex justify-center h-fit gap-2 p-10">
                  <FontAwesomeIcon className="bounce-top text-fuchsia-100"  icon={faMobileScreenButton} style={{ fontSize: '50px' }} />
                </div>
              </>
            }

            {actionLabel !== 'Save' && actionLabel !== 'Delete Permanently' && actionLabel != 'Turn the Phone' &&
              <>
                <div className="flex flex-col h-[80px] p-10 z-10" >
                  <Button
                    disabled={disabled}
                    label='Login with Google'
                    fullWidth

                    onClick={() => handleClick()}
                  />
                </div>
                <div className="flex flex-col h-[80px] p-10 mb-10 -mt-6" >
                  <Button
                    disabled={disabled}
                    label='Login with Github'
                    fullWidth
                    onClick={() => handleLoginGitHub()}
                  />
                </div>
              </>

            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal;