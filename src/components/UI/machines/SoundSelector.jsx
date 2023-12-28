const SoundSelector = ({ disabled, defaultValue, label, optionLabels = [], optionKeys = [], optionValues = [], onSelect }) => {
  return (
    <div className="border border-fuchsia-500/40 border-1 px-2 py-1 rounded-lg flex items-center justify-center gap-2 flex-col h-[74px] w-[237px]">
      <div className={`${!disabled ?'text-fuchsia-500/90' : 'text-fuchsia-500/40'} text-md font-bold bg-black absolute top-1 px-2`}>{label}</div>
      <select
        className={`${!disabled ? 'text-fuchsia-100' : 'text-fuchsia-100/40'} bg-zinc-800 text-sm rounded-lg h-9 w-[128px] cursor-pointer hover:opacity-80`}
        onChange={(e) => onSelect(e.target.value)}
        disabled={disabled}>
        {optionValues?.map((value, i) => (
          <option
            key={optionKeys[i] || value}
            value={value}
            className="text-fuchsia-100/70"
            selected={defaultValue === value}
          >
            {optionLabels[i] || value}
          </option>
        ))}
      </select>
    </div>);

}

export default SoundSelector;