import { useEffect, useState } from "react";

const BankSelect = ({soundBank, setSound}) => {
  // const [kit, setKit] = useState('kitEOE');
  const [allKits, setAllKits] = useState([]);

  useEffect(() => {
    setAllKits([...soundBank])
  }, [])

  function handleSelect(e) {
    let name = e.target.value;
    let selectedSound= allKits.filter(k => k.name === name);
    console.log(selectedSound[0].sounds) //this works
    setSound(selectedSound[0].sounds);
  }

  return (
    <div className="mx-5">
      <select onChange={(e) => handleSelect(e)}>
        {
          allKits.map(k => {
            return <option className="text-fuchsia-900">{k.name}</option>
          })
        }
      </select>

    </div>);
}

export default BankSelect;