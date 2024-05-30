import React, { useState } from 'react';
import NoSleep from 'nosleep.js';
import "../../styles/home.css"

export const CookMode = () => {
    const [isChecked, setIsChecked] = useState(false);
    const noSleep = new NoSleep();
  
    const handleToggle = () => {
      setIsChecked(!isChecked);
      if (!isChecked) {
        noSleep.enable();
      } else {
        noSleep.disable();
      }
    };
  
    return (
      <div className="cook-mode" style={{ color: "#303131", fontSize:"18px", display:"flex",}}>
        <hr style={{
                  width: "41%",
                  margin: "15px auto",
                  border: "1px solid grey",
                }} ></hr>
        <div className="cook-mode-toggle">
          <input
            className="visually-hidden"
            type="checkbox"
            id="cook-mode-toggle"
            checked={isChecked}
            onChange={handleToggle}
          />
          <label htmlFor="cook-mode-toggle" className={isChecked ? 'active' : ''}>
            <svg xmlns="http://www.w3.org/2000/svg" width="47" height="24" viewBox="0 0 47 24" fill="none">
              <rect x="0.547241" y="0.5" width="45.0741" height="23" rx="11.5" fill="#EBEAEA" stroke="#CBCBCB" />
              <ellipse cx={isChecked ? '34.3872' : '12.6128'} cy="12" rx="8.3771" ry="8" fill="#CBCBCB" />
            </svg>
            <span className="cook-mode-label" style={{paddingRight:"10px",}}>Bake Mode</span><span className="cook-mode-description" style={{fontStyle:"italic", fontSize:"15px"}}>Prevent your screen from going dark as you follow along.</span>
          </label>
        </div>
        <hr style={{
                  width: "41%",
                  margin: "15px auto",
                  border: "1px solid grey",
                }} ></hr>
      </div>
    );
  };
  
