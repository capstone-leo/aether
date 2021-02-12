import React from 'react';

export function Slider() {
  return (
    <div className="slider">     
    <div className="sliderchild">tempo</div>
      <input
        className="sliderknob"
        type="range"
        min="0"
        max=".15"
        defaultValue=".075"
        step="0.0025"
        id="slider"
        orient="horizontal"
        style={{ right: '40' }}
      ></input>

    </div>
  );
}
