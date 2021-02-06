import React from 'react';

export const EndSession = (props) =>{
const {endSession} = props;
  return (
    <div className="animate-buttons">
      <button onClick={() => endSession()}>End Session</button>
    </div>
  )
}