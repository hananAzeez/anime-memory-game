import { useState } from "react";
import "./select.css";

const Select = ({ handleNumberOfCards }) => {
  const [value, setValue] = useState(6);

  const handleSelect = (e) => {
    handleNumberOfCards(e.target.value);
  };
  return (
    <div className="select">
      <select name="cards" id="cards" onChange={handleSelect}>
        <option value="" disabled>
          Number of Cards
        </option>
        <option value="4">4 Cards</option>
        <option value="6">6 Cards</option>
        <option value="8">8 Cards</option>
        <option value="10">10 Cards</option>
        <option value="12">12 Cards</option>
      </select>
    </div>
  );
};

export default Select;
