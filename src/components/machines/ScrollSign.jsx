import MachineButton from "../UI/machines/Buttons/machineButton/MachineButton";

const ScrollSign = () => {
 
  return (
    <div className={`blink-animation vissible xl:hidden hover:-translate-x-[-5px]
    absolute top-[90px] opacity-50 lg:right-[4.5%] md:right-[3%] right-[5px] z-20 transform transition-transform duration-300 shadow shadow-cyan-100/40 shadow-xl rounded-xl`}>
      <MachineButton
        label={'>>'}
        size="sm"
        color="text-fuchsia-200/90 "
        backgroundColor="bg-black"
        hoverToBright
        onClick={ () => {}}    
        />
    </div>
  );
}

export default ScrollSign;