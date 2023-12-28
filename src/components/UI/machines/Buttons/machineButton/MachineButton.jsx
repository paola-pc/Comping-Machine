import styles from './MachineButton.module.css'

const MachineButton = ({ id, label, size = 'fit', widthInPx, disabled, onClick, color, backgroundColor, borderColor, isMainButton, lightColor, hoverToBright }) => {
  const resolveSize = () => {
    if (widthInPx) return `w-${widthInPx}px`;
    if (size === 'fit') return 'w-fit';
    if (size === 'sm') return "w-[35px] text-sm";
    if (size === 'md') return "w-[77px] text-sm";
    if (size === 'max') return 'w-max';
    if (size === 'lg') return 'w-[77px]'
    if (size === 'xl') return 'w-[100px] h-[70px] text-xl'
  }

  const resolveBorder = () => {
    if (widthInPx) {
      if (widthInPx > 39) return `border border-2  ${borderColor}`;
      else return `border border-1  ${borderColor}`;
    }
    if (size === 'sm') return `border border-1 ${borderColor}`;
    else return `border border-2 ${borderColor}`
  }

  const resolvedSize = resolveSize();
  const resolvedBorder = resolveBorder();


  return (
    <div className={`${resolvedSize} ${!disabled && !hoverToBright && 'hover:opacity-80'} ${!disabled && hoverToBright && 'hover:opacity-100 transition-opacity'} `}>
      <button className={`${!lightColor ? styles.border : 'shadow shadow-md ' + lightColor} rounded-lg ${isMainButton && styles.button} ${resolvedSize} ${resolvedBorder} ${color || 'text-white'} ${backgroundColor} disabled:opacity-50 transition-opacity transition-colors`}
        onClick={onClick}
        disabled={disabled}
        id={id}
      >
        {label}
      </button>
    </div>
  );
}

export default MachineButton;