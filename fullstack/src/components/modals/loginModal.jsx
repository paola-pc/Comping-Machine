import useLoginModal from "../../../Hooks/useLoginModal";
import { useState, useCallback } from "react";

import Modal from "../Modal";
import axios from "axios";

const LoginModal = () => {
  const loginModal = useLoginModal(); //the custom hook
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const onLogin = useCallback(async () => {
    try {
      //Add register and/or log logic
      // await axios.post('/api/register', {
      //   email,
      //   username,
      //   isLoading
      // })
      loginModal.onClose()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }, [loginModal]) //we depend on it


  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Identify"
      actionLabel="Continue with google"
      onClose={loginModal.onClose}
      onLogin={onLogin}
    />
  );

}

export default LoginModal;