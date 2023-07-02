import { useState } from "react";

const NumberItem = ({ value, deleteNumber, updateNumber }) => {
  const [number, setNumber] = useState(value.number);
  const handleChangeNumber = (e) => setNumber(e.target.value);

  return (
    <div>
      <input value={number} onChange={handleChangeNumber} />
      <button onClick={deleteNumber(value.id)}>Delete</button>
      <button onClick={updateNumber(value.id, number)}>Update</button>
    </div>
  );
};

export default NumberItem;
