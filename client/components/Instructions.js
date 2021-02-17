import React from 'react'

export function Instructions(props) {
  const {toggleModal, enableOutline} = props
  return (
    <div className="about">
      <button
        id="aboutbtn"
        // style={{
        //   color: 'whitesmoke',
        //   position: 'relative',
        //   background: 'transparent',
        //   border: 'transparent',

        // }}
        className={enableOutline ? '' : 'no-outline-on-focus'}
        onClick={() => toggleModal()}
      >
        instructions
      </button>
    </div>
  )
}
