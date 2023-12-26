import { useEffect, useState } from "react";

const SequenceGrid = ({ chordNames, onRemoveChord, setStep, step, bars, subdivision }) => {
  const [padsToRender, setPadsToRender] = useState([]);
  const [multiplierValue, setMultiplierValue] = useState(4) // Default for quarter notes

  useEffect(() => {
    const arr = new Array(Number(bars * subdivision)).fill(0);
    setMultiplierValue(16 / Number(subdivision)) // Currently sequences are stored as 16ths
    setPadsToRender(arr)
  }, [bars, subdivision])

  return (
    <div className={`grid grid-cols-${subdivision} gap-1`} >
      {/* GHOST DIV FOR TAILWIND TO CREATE ALL NEEDED GRID CLASSES */}
      <div className="grid-cols-1 grid-cols-2 grid-cols-4 grid-cols-8 grid-cols-16 hidden" />
      {padsToRender.map((el, i) =>
        <div key={el + '-' + i} className="relative">
          <div id={i}
            onClick={() => setStep(i*multiplierValue)}
            className={`flex items-center justify-center opacity-80 rounded  h-[30px] min-w-[57px] text-fuchsia-300 cursor-default
                  ${Math.ceil((i + 1) / subdivision) % 2 === 0 ? 'bg-fuchsia-600' : 'bg-sky-600'}
                  ${Math.ceil((i + 1) / subdivision) % 2 === 0 ? 'hover:opacity-100 hover:bg-fuchsia-500' : 'hover:opacity-100 hover:bg-sky-600'}
                  ${step === i*multiplierValue && 'border border-white border-2' }
                  `}
            style={{ fontSize: '10px' }}
          >
            {(i === 0 || i === Number(subdivision) || i % Number(subdivision) === 0) && (
              <span id="bar-number" className="absolute -top-[2px] left-[1px] text-white">
                {(i/Number(subdivision)+1)}
              </span>
            )}
            <span id="chord-name" className="text-white text-xs">{chordNames[i * multiplierValue]}</span>
          </div>
          <div className="">
            <button className={`opacity-70 hover:opacity-100 absolute -top-2 -right-1 text-sm
                    ${chordNames[i * multiplierValue] ? 'visible' : 'invisible'}`}
              id={i*multiplierValue} onClick={(e) => onRemoveChord(e)}>⛔</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SequenceGrid;