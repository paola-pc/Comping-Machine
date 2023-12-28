import { useEffect, useState } from 'react';
import styles from './Knob.module.css'

const Knob = ({ sensitivity = 6, defaultValue, value, onChange, sideLabel, showValue, id, sm, disabled }) => {
  const [degree, setDegree] = useState(0);
  const [startY, setStartY] = useState(0);
  const [moving, setMoving] = useState(false);

  const minDegree = -120;
  const maxDegree = 150;

  const updateDegree = (currentY) => {
    let deltaY = startY - currentY;
    let newDegree = degree + deltaY * sensitivity;
    newDegree = Math.max(minDegree, Math.min(newDegree, maxDegree));
    setDegree(newDegree);
    setStartY(currentY);
    const newValue = newDegree + 120;
    onChange(newValue, id)
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (moving && !disabled) {
        updateDegree(e.clientY);
      }
    };

    const handleMouseDown = (e) => {
      setStartY(e.clientY);
      setMoving(true);
    };

    const handleMouseUp = () => {
      setMoving(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    const knob = document.getElementById(id);
    knob?.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      knob.removeEventListener('mousedown', handleMouseDown);
    };
  }, [degree, moving]);

  useEffect(() => {
    setDegree(defaultValue)
  }, [defaultValue])

  const knobStyle = {
    transform: `rotate(${degree}deg)`
  };



  return (
    <div className={`w-fit flex gap-6 ${disabled && 'opacity-40'}`} >
      <div className={`${sm ? styles.smSlider : styles.slider} opacity-80 ${!disabled && 'hover:opacity-100 cursor-pointer'}`}>
        <div id={id} className={`${sm ? styles.smKnob : styles.knob}`} style={knobStyle}></div>
      </div>
      {sideLabel &&
        <div className='flex flex-col justify-center text-fuchsia-500/90 text-md' >
          <div className='flex flex-col '>
            {<span className='font-bold'>{sideLabel}</span>}
            {showValue && <span className='text-cyan-100/90 hover:text-cyan-100'>{value}</span>}
          </div>
        </div>}
    </div>

  );
}

export default Knob;

