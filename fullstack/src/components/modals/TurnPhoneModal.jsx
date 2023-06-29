import useTurnPhoneModal from "../../../Hooks/useTurnPhoneModal";
import Modal from "../Modal";

const TurnPhoneModal = () => {
  const turnPhoneModal = useTurnPhoneModal();

  return (
    <Modal
      isOpen={turnPhoneModal.isOpen}
      actionLabel="Turn the Phone"
      title="It is cramped in here... "
      onClose={turnPhoneModal.onClose}
    />
  );
}
 
export default TurnPhoneModal;