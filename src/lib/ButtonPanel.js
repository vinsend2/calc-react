import React, {useEffect} from 'react';

export default function ButtonPanel (props) {
    
  function onClick(event){
    const target = event.target;
    target.classList.remove('clicked');
    setTimeout(() => {
      target.classList.add('clicked');
    }, 0);
    props.onClick(target.dataset.value);
    console.log(target.dataset.value);
  };

  useEffect(() => {
    let buttons = document.querySelectorAll('.react-calc button');
    buttons = [].slice.call(buttons);
    const keyMapping = {};
    buttons.forEach((button) => {
      keyMapping[button.dataset.code] = button;
    });
    props.onLoad(keyMapping);    
}, []);

    return (
      <div className="react-calc button-panel row">
        <div className="s3 column">
          <div className="s1 row">
            <button className="button s1" data-code="67" data-value="c" onClick={onClick}>C</button>
            <button className="button s1" data-code="" data-value="sqrt" onClick={onClick}>√‎</button>
            <button className="button s1" data-code="37" data-value="%" onClick={onClick}>%</button>
            <button className="button s1" data-code="191" data-value="/" onClick={onClick}>/</button>
          </div>
          <div className="s1 row">
            <button className="button s1" data-code="55" data-value="7" onClick={onClick}>7</button>
            <button className="button s1" data-code="56" data-value="8" onClick={onClick}>8</button>
            <button className="button s1" data-code="57" data-value="9" onClick={onClick}>9</button>
            <button className="button s1" data-code="shift+56" data-value="*" onClick={onClick}>×</button>
          </div>
          <div className="s1 row">
            <button className="button s1" data-code="52" data-value="4" onClick={onClick}>4</button>
            <button className="button s1" data-code="53" data-value="5" onClick={onClick}>5</button>
            <button className="button s1" data-code="54" data-value="6" onClick={onClick}>6</button>
            <button className="button s1" data-code="189" data-value="-" onClick={onClick}>-</button>
          </div>
          <div className="s1 row">
            <button className="button s1" data-code="49" data-value="1" onClick={onClick}>1</button>
            <button className="button s1" data-code="50" data-value="2" onClick={onClick}>2</button>
            <button className="button s1" data-code="51" data-value="3" onClick={onClick}>3</button>
            <button className="button s1" data-code="shift+187" data-value="+" onClick={onClick}>+</button>
          </div>
          <div className="s1 row">
          <button className="button s2" data-code="" data-value="00" onClick={onClick}>00</button>
            <button className="button s2" data-code="48" data-value="0" onClick={onClick}>0</button>
            <button className="button s1" data-code="190" data-value="." onClick={onClick}>,</button>
            <button className="button s2 button-equal" data-code="13" data-value="=" onClick={onClick}>=</button>
          </div>
        </div>   
      </div>
    );
  }

