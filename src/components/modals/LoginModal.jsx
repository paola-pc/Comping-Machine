import useLoginModal from "../../../Hooks/useLoginModal";
import { useState, useEffect } from "react";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import axios from 'axios'
// import Modal from "../Modal";
import Modal from "../UI/Modals/Modal";
import Button from "../UI/Button";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("session", JSON.stringify(session));
  }, [])

  const registerUser = async (newUser) => {
    try {
      const response = await axios.post('/api/log', newUser)
      return response;
    } catch (error) {
      console.log('Error registering User ', error)
      return false;
    };
  }

  useEffect(() => {
    if (session) {
      const newUser = {
        username: session.user.name,
        email: session.user.email
      }
      const redirectToProfile = async () => {
        const registered = await registerUser(newUser);
        if (registered) {
          session.user.id = registered.data.id;
          localStorage.setItem("session", JSON.stringify(session));
          router.push('/userHome');
        }
      }
      redirectToProfile();
    }
  }, [])

  // HANDLERS ···································································
  const handleLogin = (method) => {
    setIsLoading(true)
    try {
      signIn(method);
    } catch (error) {
      console.log(error)
      return <div className="text-fuchsia-100">Oops... Something went wrong</div>
    } finally {
      setIsLoading(false)
    }
  }

  const handleOnClose = () => {
    loginModal.onClose();
    router.push('/')
  }

  return (

    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="LOG IN:"
      onClose={handleOnClose}
    >
      <>
        <div className="flex flex-col h-[80px] p-10 z-10" >
          <Button
            disabled={isLoading}
            label='Login with Google'
            fullWidth
            onClick={() => handleLogin('google')}
          />
        </div>
        <div className="flex flex-col h-[80px] p-10 mb-10 -mt-6" >
          <Button
            disabled={isLoading}
            label='Login with Github'
            fullWidth
            onClick={() => handleLogin('github')}
          />
        </div>
      </>
    </Modal>


  );

}

export default LoginModal;