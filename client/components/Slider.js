import React from 'react';

export function Slider () {

  const [value, setValue] = React.useState(value);

  function onValueChange(newval){
     setValue(newval)
  }
  return (<div>
        <input
       className='sliderchild'
      type='range'
      min='0'
      max='.15'
      step='.005'
      id='slider'
      orient='horizontal'
      style={{  right: '40', left: '40'}}
      defaultValue='.075'
    ></input> 
    <div className="sliderchild">
    tempo
    </div>  
     </div>
    
    
  );
}
