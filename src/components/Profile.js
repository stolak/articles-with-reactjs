import React, { useState, useRef } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";


const Profile = () => {
  const [category, setCategory] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  const onChangeCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  };
  const options = [
    {
      label: "Apple",
      value: "apple",
    },
    {
      label: "Mango",
      value: "mango",
    },
    {
      label: "Banana",
      value: "banana",
    },
    {
      label: "Pineapple",
      value: "pineapple",
    },
  ];
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.name}</strong> Profile
        </h3>
      </header>
      <p>
        {/* <strong>Token:</strong> {currentUser.token.substring(0, 20)} ... */}
        {/* {currentUser.token.substr(currentUser.token.length - 20)} */}
      </p>
      <div className="select-container">
          <select
           value={category}
           onChange={onChangeCategory}
          >
          <option value=''>All</option>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
    </div>
  );
};

export default Profile;