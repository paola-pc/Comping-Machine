import useLoginModal from "../../../Hooks/useLoginModal";
import useSaveModal from "../../../Hooks/useSaveModal";
import MachineButton from "../UI/machines/Buttons/machineButton/MachineButton";

const SaveSessionButton = ({ editing, loggedUser }) => {
  const saveModal = useSaveModal();
  const loginModal = useLoginModal();

  const handleOnSave = () => {
    saveModal.onOpen();
  }

  const handleLogin = () => {
    loginModal.onOpen();
  }

  return (
    <div className={`absolute top-[115px] left-[5%] -rotate-90 transform transition-transform duration-300 hover:-translate-x-[30px] hover:rotate-0 shadow shadow-cyan-100/40 shadow-xl rounded-xl`}>
      <MachineButton
        // label={editing ? "Update Session" : "Save Session"} // Implement session update?
        label={loggedUser ? "Save Session" : "Save? Login!"}
        size="lg"
        color="text-emerald-200 hover:emerald-100"
        backgroundColor="bg-black hover:bg-emerald-800/50"
        hoverToBright
        onClick={loggedUser ? handleOnSave : handleLogin}      
        />
    </div>
  );
}

export default SaveSessionButton;