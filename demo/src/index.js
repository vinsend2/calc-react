import React from 'react';
import {render} from 'react-dom';

import Calculator from '../../src';

const style = `color: yellow`;

function Main () {
  function handleInput(input) {
    console.log(`User clicked the ${input.key}`);
  }

  function onResultChange(newResult) {
    console.log(newResult);    
  }
  
    return <div className='calculator-main' style={{color: `yellow`}}>     
      <Calculator
        onNewInput={handleInput}
        onResultChange={onResultChange}/>
    </div>
  }

render(<Main/>, document.querySelector('#demo'));
