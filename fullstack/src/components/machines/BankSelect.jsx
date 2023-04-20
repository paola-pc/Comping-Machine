import { useEffect, useState } from "react";

const BankSelect = ({soundBank}) => {
  const [kit, setKit] = useState('kitEOE');
  const [allKits, setAllKits] = useState([]);

  useEffect(() => {
    setAllKits([...soundBank])
  }, [])

  function handleSelect(e) {
    let name = e.target.value;
    let selectedKit = allKits.filter(k => k.name === name);
    console.log([...selectedKit]) //this works
    setKit([...selectedKit]);
  }

  return (
    <div>
      <select onChange={(e) => handleSelect(e)}>
        {
          allKits.map(k => {
            return <option className="text-black">{k.name}</option>
          })
        }
      </select>

    </div>);
}

export default BankSelect;