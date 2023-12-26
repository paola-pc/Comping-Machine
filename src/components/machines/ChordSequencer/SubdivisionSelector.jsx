const selectedStyle = 'text-fuchsia-400 opacity-90'
const notSelectedStyle = 'text-fuchsia-300 opacity-40 hover:opacity-90 hover:text-fuchsia-400'

const SubdivisionSelector = ({ subdivision, setSubdivision }) => {
  const handleOnChange = (e) => {
    setSubdivision(e.target.value);
  };

  return (
    <div className=" flex gap-4 text-sm">
      <label className={subdivision === '1' ? selectedStyle : notSelectedStyle}>
        <input
          type="radio"
          name="redondas"
          value={'1'}
          onChange={handleOnChange}
          checked={subdivision === '1'}
          className='mr-2'
        />
        W
      </label>
      <label className={subdivision === '2' ? selectedStyle : notSelectedStyle}>
        <input
          type="radio"
          name="blancas"
          value={'2'}
          onChange={handleOnChange}
          checked={subdivision === '2'}
          className='mr-2'
        />
        H
      </label>

      <label className={subdivision === '4' ? selectedStyle : notSelectedStyle}>
        <input
          type="radio"
          name="negras"
          value={'4'}
          onChange={handleOnChange}
          checked={subdivision === '4'}
          className='mr-2'
        />
        Q
      </label>

      <label className={subdivision === '8'? selectedStyle : notSelectedStyle}>
        <input
          type="radio"
          name="corcheas"
          value={'8'}
          onChange={handleOnChange}
          checked={subdivision === '8'}
          className='mr-2'
        />
        8ths
      </label>

      <label className={subdivision === '16'? selectedStyle : notSelectedStyle}>
        <input
          type="radio"
          name="semicorcheas"
          value={'16'}
          onChange={handleOnChange}
          checked={subdivision === '16'}
          className='mr-2'
        />
        16ths
      </label>
    </div>
  );
}

export default SubdivisionSelector;
