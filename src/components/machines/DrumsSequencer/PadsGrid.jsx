import { useEffect } from "react";
import TrackControls from "./TrackControls";

const PadsGrid = ({
  savedDrumsSequence,
  trackIds,
  stepIds,
  stepsRef,
  onMuteTrack,
  onSoloTrack,
  soloist,
  mutedTracks,
  handleDrumTrackLevel,
  trackNames,
}) => {
  return (<>
    <div className='flex flex-col justify-around'>
      {trackIds.map((trackId, i) => (
        <div key={"track-" + trackId} className="flex gap-3">
          <TrackControls id={trackId} trackName={trackNames?.[trackId]} onMuteTrack={onMuteTrack} onSoloTrack={onSoloTrack} soloist={soloist} mutedTracks={mutedTracks} handleDrumTrackLevel={handleDrumTrackLevel} />
          <div key={trackId} className='grid grid-cols-16 gap-2'>
            {savedDrumsSequence?.length
              ? stepIds.map((stepId) => {
                const id = trackId + "-" + stepId;
                return (
                  <label key={trackId + "-" + stepId} className='inline relative'>
                    <input
                      id={id}
                      type="checkbox"
                      ref={(elm) => {
                        if (!elm) return;
                        if (!stepsRef.current[trackId]) {
                          stepsRef.current[trackId] = [];
                        }
                        stepsRef.current[trackId][stepId] = elm;
                      }}
                      defaultChecked={savedDrumsSequence[i][stepId]}
                      className='h-7 w-[70px] hover:cursor-pointer bg-fuchsia-200 checked:bg-fuchsia-600 rounded border-fuchsia-400 text-fuchsia-500 checked:ring-fuchsia-900 checked:ring-1 shadow-md hover:bg-fuchsia-300 checked:shadow-none focus:border-1 shadow-fuchsia-500'
                    />
                    <span className='absolute left-1 text-fuchsia-700 tracking-tighter text-xs opacity-50 hover:cursor-pointer'>{stepId + 1}</span>
                  </label>
                );
              })
              : stepIds.map((stepId) => {
                const id = "saved-" + trackId + "-" + stepId;
                return (
                  <label key={trackId + "-" + stepId} className='inline relative'>
                    <input
                      id={id}
                      type="checkbox"
                      ref={(elm) => {
                        if (!elm) return;
                        if (!stepsRef.current[trackId]) {
                          stepsRef.current[trackId] = [];
                        }
                        stepsRef.current[trackId][stepId] = elm;
                      }}
                      className='h-7 w-14 hover:cursor-pointer bg-fuchsia-200 checked:bg-fuchsia-600 rounded border-fuchsia-400 text-fuchsia-500 checked:ring-fuchsia-900 checked:ring-1 shadow-md hover:bg-fuchsia-300 checked:shadow-none focus:border-1 shadow-fuchsia-500'
                    />
                    <span className='absolute top-[2%] right-[2px] text-fuchsia-800 tracking-tighter text-xs opacity-50 hover:cursor-pointer'>{stepId + 1}</span>
                  </label>
                );
              })
            }
          </div>
        </div>
      ))}
    </div>
  </>)
}

export default PadsGrid;
