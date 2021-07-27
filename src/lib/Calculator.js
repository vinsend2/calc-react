import React, { useState } from 'react';
import ResultPanel, { replacement } from './ResultPanel';
import ButtonPanel from './ButtonPanel';
import { evaluate } from './MathEngine';

export default function Calculator (props) {

  const [state, setState] = useState ({
    last: '',
    cur: '0'
  });  

  const [keyMap, setKeyMap] = useState("");
  

  function onPaste(event){
    if(event.isTrusted) {
      const data = event.clipboardData || window.clipboardData;
      const pastedData = data.getData('Text')
      let cur;
      replacement.forEach((item) => {
        cur = pastedData.replace(item.dist, item.reg);     
      });
      try {       
        setStateAndNotify({         
          cur: evaluate(cur).toString(),
          last: cur
        })
      } catch (e) {
        setStateAndNotify({
          cur,
          last: 'Not a valid expression'
        })
      }
    }
  }

  function setStateAndNotify(newState) {
    setState(newState, props.onResultChange ? props.onResultChange({expression: newState.last, result: newState.cur}) : null)
  }

  function handleKeyDown (event) {    
    let button;
    if(event.ctrlKey || event.keyCode === 67){
      return
    }
    const key = (event.shiftKey ? 'shift+' : '') + event.keyCode || event.which;
    if (button = keyMap[key]) {
      button.click();
      event.stopPropagation();
      event.preventDefault();
    }    
  }



  function onButtonClick(type) {
    const {cur} = state
    const lastLetter = cur.slice(-1);
    switch (type) {
      case 'c':
        setStateAndNotify({
          last: '',
          cur: '0'
        });
        break;
        case 'sqrt':
          const sqrt = Math.sqrt(cur).toString()
          setStateAndNotify({
            last: '',
            cur: sqrt
          });
          break;       
      case '=':
        try {
          console.log(cur)
          const output = evaluate(cur).toString()
          setStateAndNotify({
            last: cur + '=',
            cur: output
          });
        } catch (e) {
          console.log(e)
          setState({
            last: cur + '=',
            cur: 'NaN'
          });
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
      if(Number(cur) === 0 && type === '-') {
         setState({
          last: '',
            cur: type            
          })
          break
        }
        if((lastLetter === '*' && type === '-') || (lastLetter === '/' && type=== '-')){
          setState({
            last: '',
            cur: cur + type
          })
          break
        }

        if (lastLetter === '+' || lastLetter === '-' || lastLetter === '*' || lastLetter === '/')
          setState({
            last: '',
            cur: cur.slice(0, -1) + type
          });
        else
          setState({
            last: '',
            cur: cur + type
          });
        break;
      case '.':
        if (lastLetter !== '.') {
          setState({
            last: '',
            cur: cur + type
          });
        }
        break;
      default:
        setState({
          last: '',
          cur: cur === '0' ? type : cur + type
        });
        break;
      }
      if(props.onNewInput) {
       props.onNewInput({expression: state.cur, key: type})
      }
  }

 
    return (
      <div className="react-calculator"
        onPaste={onPaste}
        onKeyDown={handleKeyDown}>
        <ResultPanel {...state} />
        <ButtonPanel
          onClick={onButtonClick}         
          onLoad={setKeyMap}/>
      </div>
    );
  }

