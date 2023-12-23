import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTurnPhoneModal from "../../../Hooks/useTurnPhoneModal";
// import Modal from "../Modal";
import Modal from "../UI/Modals/Modal"

const TurnPhoneModal = () => {
  const turnPhoneModal = useTurnPhoneModal();

  return (
    <Modal
      isOpen={turnPhoneModal.isOpen}
      title="It is cramped in here... "
      description="We suggest you to rotate your phone 90 degrees or make this window wider!"
      onClose={turnPhoneModal.onClose}
    >
      <div className="rotate-90-cw flex justify-center h-fit gap-2 p-10">
        <FontAwesomeIcon className="bounce-top text-fuchsia-100" icon={faMobileScreenButton} style={{ fontSize: '50px' }} />
      </div>
    </Modal>
  );
}

export default TurnPhoneModal;