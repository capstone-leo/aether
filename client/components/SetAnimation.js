import React from 'react';

export const SetAnimation = (props) =>{
const {pausePlay} = props;
  return (
    <div className="animate-buttons">
      <button onClick={() => pausePlay()}>Play/Pause</button>
    </div>
  )
}