import Knob from "bring/components/UI/machines/Buttons/Knob/Knob";
import { useEffect, useRef, useState } from "react";
import BpmControl from "./BmpControl";
import MachineButton from "bring/components/UI/machines/Buttons/machineButton/MachineButton";

const containerStyle = "flex xl:justify-center justify-start h-[105px] overflow-x-auto overflow-y-hidden w-[93%] min-w-[698px] p-5 rounded-b-lg mx-auto "

const MasterControls = ({ handlePlay, isPlaying, children, bpm, handleTempoChange, handleDrumsLevel, handelPadLevel }) => {
  const [isSticky, setIsSticky] = useState(false);
  const scrollRef = useRef(null);

  // SCROLL BEHAVIOUR ·····································································
  const handleScroll = () => {
    if (scrollRef.current) {
      setIsSticky(scrollRef.current.getBoundingClientRect().top <= 0);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div ref={scrollRef} id="Master-controls" className={`${containerStyle} z-10 bg-black border-b border-l border-r ${isPlaying ? 'border-emerald-200/80' : 'border-fuchsia-800'} ${isSticky ? 'sticky top-0' : 'relative'} transition-colors`}>
        <div id='transporter' className="flex items-center">
          <MachineButton
            label={isPlaying ? 'Stop' : 'Play'}
            size="xl"
            isMainButton={!isPlaying}
            onClick={handlePlay}
            color={isPlaying ? 'text-rose-400' : 'text-white'}
            borderColor={isPlaying ? 'border-rose-400' : 'border-white'}
            lightColor={isPlaying && 'shadow-rose-400/60'}
          />
          <div style={{ minWidth: '20px', maxWidth: '20px' }}></div>
          <BpmControl bpm={bpm} onChange={handleTempoChange} />
          <div style={{ minWidth: '20px', maxWidth: '20px' }}></div>
          <div className="flex items-center justify-center mx-2">
            <Knob id={'drums-level-knob'} onChange={handleDrumsLevel} sideLabel={"Drums"} defaultValue={150} />
            <div style={{ minWidth: '20px', maxWidth: '20px' }}></div>
            <Knob id={'pad-level-knob'} onChange={handelPadLevel} sideLabel={"Pad"} defaultValue={150} />
          </div>
          <div style={{ minWidth: '20px', maxWidth: '20px' }}></div>
          {children}
        </div>
      </div>
    </>
  );
}

export default MasterControls;