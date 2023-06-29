import { useState } from "react";
import Modal from "../Modal";
import useDeleteModal from "../../../Hooks/useDeleteModal";
import axios from "axios";

const DeleteModal = () => {
  const deleteModal = useDeleteModal();
  const [isLoading, setIsLoading] = useState('');

  const deleteSession = async () => {
    try {
      const response = await axios.delete(`/api/deleteSession?id=${deleteModal.trackId}`)
    } catch (error) {
      console.log('error in save modal: ', error);
    }

    if (window !== undefined) window.location.reload();
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={deleteModal.isOpen}
      title="Delete Session"
      actionLabel="Delete Permanently"
      onClose={deleteModal.onClose}
      action={() => {
        deleteSession()
      }}
    />
  );
}

export default DeleteModal;