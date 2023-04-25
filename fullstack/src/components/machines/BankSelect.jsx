import { useEffect, useState } from "react";

const BankSelect = ({soundBank, setSound}) => {
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
      <select className="text-fuchsia-900 bg-fuchsia-100"
        onChange={(e) => handleSelect(e)}>
        {
          allKits.map(k => {
            return <option className="text-fuchsia-900">{k.name}</option>
          })
        }
      </select>

    </div>);
}

export default BankSelect;