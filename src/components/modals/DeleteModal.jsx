import { useState } from "react";
import axios from "axios";
import { TbMusicOff } from "react-icons/tb";

import Modal from "../UI/modals/Modal"
import useDeleteModal from "../../../Hooks/useDeleteModal";

const DeleteModal = () => {
  const deleteModal = useDeleteModal();
  const [isLoading, setIsLoading] = useState(false);


  const handleDeleteSession = async () => {
    setIsLoading(true)
    try {
      await axios.delete(`/api/deleteSession?id=${deleteModal.trackId}`)
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
      mainActionIcon={TbMusicOff}
    />
  );
}

export default DeleteModal;