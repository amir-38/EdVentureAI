import React, { useState } from "react";
import Forms from "./Forms";
import SearchableDropdown from "./SearchebleDropdown";
import { animals } from "../data/database";
import "../App.css";
function UserInfoForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [value, setValue] = useState("Mektebi secin...");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const handleNextClick = () => {
    if (firstName && lastName && selectedGroup) {
      setShowQuestionnaire(true);
    } else {
      alert("Пожалуйста, заполните все поля и выберите группу.");
    }
  };

  if (showQuestionnaire) {
    return <Forms selectedGroup={selectedGroup} />;
  } else {
    return (
      <div className="second-fon">
        <h2></h2>
        {/* <label>
          Ad:
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </label> */}

        <div className="form">
          <div className="form-item">
            <input
              onChange={handleFirstNameChange}
              value={firstName}
              type="text"
              id="name"
              autocomplete="off"
              required
            />
            <label htmlFor="name">Ad</label>
          </div>
        </div>
        <div className="form">
          <div className="form-item">
            <input
              onChange={handleLastNameChange}
              value={lastName}
              type="text"
              id="title"
              autocomplete="off"
              required
            />
            <label htmlFor="title">Soyad</label>
          </div>
        </div>

        {/* <label>
          Soyad:
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </label> */}

        <label className="groupLb">
          
          <select className="select" value={selectedGroup} onChange={handleGroupChange}>
            <option value="">Qrupu Seçin</option>
            <option value="Qrup 1">Qrup 1</option>
            <option value="Qrup 2">Qrup 2</option>
            <option value="Qrup 3">Qrup 3</option>
            <option value="Qrup 4">Qrup 4</option>
            <option value="Qrup 5">Qrup 5</option>
          </select>
        </label>
        <div className="App">
          <SearchableDropdown
            options={animals}
            label="name"
            id="id"
            selectedVal={value}
            handleChange={(val) => setValue(val)}
          />
        </div>

        <button className="next" onClick={handleNextClick}>Next</button>
      </div>
    );
  }
}

export default UserInfoForm;
