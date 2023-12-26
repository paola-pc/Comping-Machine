
import PadsGrid from "./PadsGrid";

// Constants · Mapped sampler key for every sample (drums)
const KEY = "C4";
const containerStyle = "flex h-[600px] w-full p-2 rounded-b-lg justify-center mx-auto gap-1 "

const DrumsSequencer = ({ tracksRef, isPlaying, ...props }) => {

  const onSoloTrack = (e) => {
    if (!isPlaying) tracksRef.current[e.target.id].sampler.triggerAttack(KEY)
    // TODO: Implement logic to solo the track when sequence isPlaying
  }

  const onMuteTrack = (e) => {
    if (tracksRef.current[e.target.id].sampler.volume.value < 0) {
      tracksRef.current[e.target.id].sampler.volume.value = 0;
      e.target.classList.remove('ring-rose-400');
      e.target.classList.remove('shadow-rose-500/50');
      e.target.classList.remove('hover:bg-rose-300');
      e.target.classList.remove('text-rose-300');
      e.target.classList.add('ring-emerald-400');
      e.target.classList.add('shadow-emerald-500/50');
      e.target.classList.add('hover:bg-emerald-300');
      e.target.classList.add('text-emerald-100');
    } else {
      tracksRef.current[e.target.id].sampler.volume.value = -64;
      e.target.classList.add('ring-rose-400');
      e.target.classList.add('shadow-rose-500/50');
      e.target.classList.add('text-rose-300');
      e.target.classList.add('hover:bg-rose-300');
    }
  }

  return (
    <div className={`${containerStyle} bg-zinc-900 py-3 px-3 rounded-lg border border-1 border-emerald-200/50`}>
      <PadsGrid {...props} onSoloTrack={onSoloTrack} onMuteTrack={onMuteTrack}/>
    </div>
  );
}

export default DrumsSequencer;