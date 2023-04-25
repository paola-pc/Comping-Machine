import { useEffect, useState } from "react";

const BankSelect = ({ soundBank, setSound, soundName, }) => {
  const [allKits, setAllKits] = useState([]);

  useEffect(() => {
    console.log('session sound', soundName)
    setAllKits([...soundBank])
  }, [])

  function handleSelect(e) {
    let name = e.target.value;
    let selectedSound = allKits.filter(k => k.name === name);
    setSound(selectedSound[0]);
  }

  return (
    <div className="mx-5">
      <select defaultValue='default' className="text-fuchsia-900 bg-fuchsia-100"
        onChange={(e) => handleSelect(e)}>
        {soundName?.length
          ? <option value='default'>{soundName}</option>
          : <option value='default'>--Select One---</option>
        }
        {soundName?.length
          ? allKits
            .filter(kit => kit.name !== soundName)
            .map(k => { return <option className="text-fuchsia-900">{k.name}</option> })
          : allKits.map(k => { return <option className="text-fuchsia-900">{k.name}</option>})
        }
      </select>

    </div>);
}

export default BankSelect;