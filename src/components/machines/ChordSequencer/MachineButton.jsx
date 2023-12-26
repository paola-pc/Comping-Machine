const MachineButton = ({
  label,
  backgroundColor = "bg-black",
  textColor = "text-white",
  secondary,
  type,
  large,
  onClick,
  disabled,
  alignDirection,
  fixWidth,
}) => {

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`
      disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-md
      hover:bg-fuchsia-800
      transition
      border
      overflow-hidden
      h-6
      ${fixWidth || 'w-fit'}
      px-1
      ${textColor}
      ${backgroundColor}
      ${secondary && 'font-semibold'}
      ${large ? 'text-md' : 'text-sm'}
    `}
    >{label}
    </button>
  )
}

export default MachineButton