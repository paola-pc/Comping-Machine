import Knob from "bring/components/UI/machines/Buttons/Knob/Knob";
import MachineButton from "bring/components/UI/machines/Buttons/machineButton/MachineButton";
import { useEffect } from "react";

const TrackControls = ({
  trackName,
  id,
  onMuteTrack,
  onSoloTrack,
  soloist,
  mutedTracks,
  handleDrumTrackLevel
}) => {

  return (
    <div className="flex items-center gap-2">
      <MachineButton
        label={trackName}
        size="md"
        borderColor={mutedTracks?.includes(id) ? 'border-rose-600' : 'border-emerald-100'}
        color={mutedTracks?.includes(id) ? 'text-rose-200' : 'text-emerald-100'}
        id={id}
        onClick={(e) => onMuteTrack(e)}
        lightColor={mutedTracks?.includes(id) && 'shadow-rose-400/40'}
      />
      <MachineButton
        label="S"
        size="sm"
        color={'text-cyan-400'}
        onClick={(e) => onSoloTrack(e)}
        id={id}
        disabled={(typeof soloist === 'number') && soloist !== id}
      />
      <Knob
        id={`track-knob-${id}`}
        defaultValue={150}
        sm
        onChange={handleDrumTrackLevel}
        disabled={(typeof soloist === 'number') && soloist !== id}
      />
    </div>
  );
}

export default TrackControls;