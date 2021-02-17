import React from 'react'

export function Instructions(props) {
  const {toggleModal, enableOutline} = props
  return (
    <div className="about">
      <button
        id="aboutbtn"
        className={enableOutline ? '' : 'no-outline-on-focus'}
        onClick={() => toggleModal()}
      >
        instructions
      </button>
    </div>
  )
}
