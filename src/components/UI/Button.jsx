const Button = ({
  label,secondary, type, fullWidth, large, onClick, disabled, icon: Icon, alignDirection
}) => {

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`
      disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-full
      font-semibold
      hover:bg-fuchsia-800
      transition
      border-2
      ${fullWidth ? 'w-full' : 'w-fit' }
      ${secondary && 'bg-white'}
      ${secondary ? 'text-black' : 'text-white' }
      ${secondary ? 'border-black' : 'border-fuchsia-800' }
      ${large ? 'text-xl' : 'text-lg' }
      ${large ? 'px-5' : 'px-4' }
      ${large ? 'py-3' : 'py-2' }
      min-w-[180px]
      h-[70px]
    `}
    >
      <div className={`flex ${alignDirection || "justify-center"} items-center gap-2`}>

      {Icon && (
        <Icon size={24} />
      )}
      {label}
      </div>
    </button>
  )
}

export default Button
