import { useEffect, useRef, useState } from "react";

const containerStyle = "flex h-[86px] w-[450px] md:w-full p-5 rounded-b-lg justify-between items-center mx-auto gap-1 "

/* 
  LOADS THE SAMPLES
  CONTAINS THE PLAYER
*/

const innerShadowStyle = 'inset 0 0px 10px 0 rgba(0, 0, 0, 0.25)'

const MasterControls = ({ handlePlay, isPlaying, children }) => {
  const [isSticky, setIsSticky] = useState(false);
  const scrollRef = useRef(null);

  const playButtonStyle = `
    text-white
    text-xl
    border 
    rounded-lg
    transform
    shadow
    shadow-md
    h-12
    w-28
    ${isPlaying ? 'shadow-none' : 'shadow-emerald-300'} 
    ${isPlaying ? 'bg-rose-800' : 'bg-emerald-600'} 
    ${isPlaying ? 'border-rose-800' : 'border-emerald-200'} 
  `;

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
    <div ref={scrollRef} className={`${containerStyle} w-full z-10 bg-black border-b border-l border-r ${isPlaying ? 'border-emerald-200/80' : 'border-fuchsia-800'} ${isSticky ? 'sticky top-0' : 'relative'}`}>
      <button className={playButtonStyle} style={{ boxShadow: `${isPlaying ? innerShadowStyle : ''}` }} onClick={handlePlay}>
        { isPlaying ? 'Stop' : 'Play'}
      </button>
      {children}
    </div>
  );
}

export default MasterControls;

// SOUNDS TO DO'S