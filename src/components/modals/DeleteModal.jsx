import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Modal from "../UI/Modals/Modal"
import useDeleteModal from "../../../Hooks/useDeleteModal";

const DeleteModal = () => {
  const deleteModal = useDeleteModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDeleteSession = async () => {
    setIsLoading(true)
    try {
      const response = await axios.delete(`/api/deleteSession?id=${deleteModal.trackId}`)
      deleteModal.onClose();
      setIsLoading(false)
    } catch (error) {
      console.log('error in save modal: ', error);
      setIsLoading(false)
    }
    if (window !== undefined) window.location.reload();
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={deleteModal.isOpen}
      title="DELETE SESSION"
      description="Do you want to delete this session permanently? This action cannot be undone."
      mainActionLabel="Delete Permanently"
      onClose={deleteModal.onClose}
      mainAction={handleDeleteSession}
    />
  );
}

export default DeleteModal;