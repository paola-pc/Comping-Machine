import useLoginModal from "../../../Hooks/useLoginModal";
import { useState, useCallback } from "react";
import { signIn } from 'next-auth/react';
import Modal from "../Modal";

const LoginModal = () => {
  const loginModal = useLoginModal(); //the custom hook
  const [isLoading, setIsLoading] = useState('');

  return (

    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Identify"
      actionLabel="Continue with google"
      onClose={loginModal.onClose}
      action={'login'}
    />
    
  );

}

export default LoginModal;