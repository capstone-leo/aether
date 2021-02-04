import React from 'react';

export function About(props) {
  const { toggleModal } = props;
  return (
    <div className="about">
      <button
        style={{
          color: 'whitesmoke',
          position: 'relative',
          background: 'transparent',
          border: 'transparent',
        }}
        onClick={() => toggleModal()}
      >
        about
      </button>
    </div>
  );
}
