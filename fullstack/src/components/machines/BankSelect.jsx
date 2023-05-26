import { useEffect, useState } from "react";

const BankSelect = ({ soundBank, setSound, soundName= 'Dream', playing}) => {
  const [allKits, setAllKits] = useState([]);

  useEffect(() => {
    setAllKits([...soundBank])
  }, [])

  function handleSelect(e) {
    let name = e.target.value;
    let selectedSound = allKits.filter(k => k.name === name);
    setSound(selectedSound[0]);
  }

  return (
    <div className="mx-5">
      {/* Implement logic here to show the name of the soundbank when saved sessions are loaded */}
      <select value={soundName}
        className="text-fuchsia-900 bg-fuchsia-100 rounded-xl"
        onChange={(e) => handleSelect(e)} disabled={playing}>
           <option >--Select One---</option>
        {allKits.map(k => { return <option key={k.name} className="text-fuchsia-900">{k.name}</option> })}
      </select>
    </div>);
}

export default BankSelect;