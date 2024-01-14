import MachineButton from "bring/components/UI/machines/Buttons/machineButton/MachineButton";
import { useState } from "react";


const shadow = { boxShadow: '0px 0px 10px #349beb inset 0px 0px 10px #349beb' }

const BpmControl = ({ bpm, onChange }) => {
  const minTempo = 30;
  const maxTempo = 300;

  const increaseTempo = (value) => {
    const newValue = bpm + value;
    const resolvedTempo = newValue > maxTempo ? maxTempo : newValue;
    onChange(resolvedTempo);

  }

  const decreaseTempo = (value) => {
    const newValue = bpm - value;
    const resolvedTempo = newValue < minTempo ? minTempo : newValue;
    onChange(resolvedTempo);
  }

  return (
    <div className={`flex flex-col items-center justify-center py-2 px-5 border border-cyan-300/30 rounded-lg`}>
      <div className="flex items-center justify-center">
        <MachineButton label="-10" disabled={bpm === minTempo} onClick={() => decreaseTempo(10)} size="sm" />
        <div style={{ width: '3px'}}></div>
        <MachineButton label="-5" disabled={bpm === minTempo} onClick={() => decreaseTempo(5)} size="sm" />
        <div style={{ width: '3px' }}></div>
        <div className="flex items-center text-white px-2">
          <button className="rounded-md px-1 hover:opacity-80 disabled:opacity-50" onClick={() => decreaseTempo(1)} disabled={bpm === minTempo}>-</button>
          <button className="rounded-md px-1 hover:opacity-80 disabled:opacity-50"  onClick={() => increaseTempo(1)} disabled={bpm === maxTempo}>+</button>
        </div>
        <div style={{ width: '3px' }}></div>
        <MachineButton label="+5" disabled={bpm === maxTempo} onClick={() => increaseTempo(5)} size="sm" />
        <div style={{ width: '3px' }}></div>
        <MachineButton label="+10" disabled={bpm === maxTempo} onClick={() => increaseTempo(10)} size="sm"/>
      </div>
      <span className="text-lg text-cyan-100">{bpm} BPM</span>
    </div>
  );
}

export default BpmControl;