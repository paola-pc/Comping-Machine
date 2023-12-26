const TrackControls = ({ trackName, id, onMuteTrack, onSoloTrack}) => {
  return (
    <div className="flex items-center gap-2">
      <button className="text-emerald-100 text-xs bg-black
                        w-[90px] ring ring-1  p-1 rounded shadow-lg ring-emerald-400 shadow-emerald-500/50 
                        hover:bg-emerald-300 hover:text-white"
        id={id}
        onClick={(e) => onMuteTrack(e)}
      >
        {trackName}
      </button>
      <button className="bg-black border border-cyan-500 w-[30px] rounded text-cyan-500 text-sm hover:bg-cyan-700 hover:text-cyan-100"
        onClick={(e) => onSoloTrack(e)}
        id={id}
      >S</button>
    </div>
  );
}

export default TrackControls;