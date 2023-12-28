import Knob from "bring/components/UI/machines/Buttons/Knob/Knob";
import { useEffect, useRef, useState } from "react";
import BpmControl from "./BmpControl";
import MachineButton from "bring/components/UI/machines/Buttons/machineButton/MachineButton";

const containerStyle = "flex h-[105px] min-w-[1250px] md:w-[93%] p-5 rounded-b-lg justify-evenly items-center mx-auto gap-8 "

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
    <div ref={scrollRef} className={`${containerStyle} w-full z-10 bg-black border-b border-l border-r ${isPlaying ? 'border-emerald-200/80' : 'border-fuchsia-800'} ${isSticky ? 'sticky top-0' : 'relative'} transition-colors`}>
      <div id='transporter' className="flex  items-center gap-12">
        <MachineButton
          label={isPlaying ? 'Stop' : 'Play'}
          size="xl"
          isMainButton={!isPlaying}
          onClick={handlePlay}
          color={isPlaying ? 'text-rose-400' : 'text-white'}
          borderColor={isPlaying ? 'border-rose-400' : 'border-white'}
          lightColor={isPlaying && 'shadow-rose-400/60'}
        />
        <BpmControl bpm={bpm} onChange={handleTempoChange} />
        <div className="flex gap-6 items-center justify-center">
          <Knob id={'drums-level-knob'} onChange={handleDrumsLevel} sideLabel={"Drums"} defaultValue={150} />
          <Knob id={'pad-level-knob'} onChange={handelPadLevel} sideLabel={"Pad"} defaultValue={150} />
        </div>
      </div>
      {children}
    </div>
  );
}

export default MasterControls;