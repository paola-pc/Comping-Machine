import { ChangeEventHandler, useEffect, useState } from "react";
import { KitBuilder } from "../../../libs/drumkits";
import { bankBuilder } from "../../../libs/padSounds";

interface BankSelectProps{
  soundBank:KitBuilder[] | bankBuilder[],
  setSound: Function,
  soundName: string
}
const BankSelect = ({ soundBank, setSound, soundName }: BankSelectProps) => {
  const [allKits, setAllKits] = useState([]);

  useEffect(() => {
    console.log('session sound', soundName)
    setAllKits([...soundBank])
  }, [])

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    let name = e.target.value;
    let selectedSound = allKits.filter(k => k.name === name);
    setSound(selectedSound[0]);
  }

  return (
    <div className="mx-5">
      {/* Implement logic here to show the name of the soundbank when saved sessions are loaded */}
      <select defaultValue='default' className="text-fuchsia-900 bg-fuchsia-100"
        onChange={(e:React.ChangeEvent<HTMLSelectElement>) => handleSelect(e)}>
           <option value='default'>--Select One---</option>
          { allKits.map(k => { return <option className="text-fuchsia-900">{k.name}</option> })}
      </select>
    </div>);
}

export default BankSelect;