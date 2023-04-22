const Button = ({
  label,secondary, type, fullWidth, large, onClick, disabled, icon: Icon
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
      hover:opacity-80
      transition
      border-2
      ${fullWidth ? 'w-full' : 'w-fit' }
      ${secondary && 'bg-white'}
      ${secondary ? 'text-black' : 'text-white' }
      ${secondary ? 'border-black' : 'border-fuchsia-800' }
      ${large ? 'text-xl' : 'text-md' }
      ${large ? 'px-5' : 'px-4' }
      ${large ? 'py-3' : 'py-2' }
    `}
    >
      <div className="flex justify-evenly">

      {Icon && (
        <Icon size={24} className=""/>
      )}
      {label}
      </div>
    </button>
  )
}

export default Button
