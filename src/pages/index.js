import ConfigMachine from "bring/components/machines/ConfigMachine";
import TurnPhoneModal from "bring/components/modals/TurnPhoneModal";
import { useEffect } from "react";
import useTurnPhoneModal from "../../Hooks/useTurnPhoneModal";

export default function Home() {
  const turnPhoneModal = useTurnPhoneModal();

  useEffect(() => {
    const handleResize = () => {
      const isNotWideEnough = window.matchMedia("(max-width: 600px)").matches;
      if (isNotWideEnough) {
        turnPhoneModal.onOpen();
      } else {
        turnPhoneModal.onClose();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (<>
    <TurnPhoneModal />
    <div id="index-container" className="flex flex-col items-center justify-around w-[90vw]">
      <ConfigMachine />
    </div>
  </>
  )
}

