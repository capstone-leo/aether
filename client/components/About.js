import React from 'react';

export function About(props) {
  const { toggleModal } = props;
  return (
    <div className="about">
      <button id="aboutbtn"
        // style={{
        //   color: 'whitesmoke',
        //   position: 'relative',
        //   background: 'transparent',
        //   border: 'transparent',
          
        // }}
        onClick={() => toggleModal()}
      >
        instructions
      </button>
    </div>
  );
}
