import React, { useState } from 'react';
import { ResultPanel, replacement } from './ResultPanel';
import { ButtonPanel } from './ButtonPanel';
import { evaluate } from './MathEngine';


interface CalculatorProps {
	onResultChange: any;
  onNewInput(obj: any): void
}

interface IState {
	last: string;
  cur: string;
}

export const Calculator: React.FC<CalculatorProps> = props => {
 

  const [state, setState] = useState<IState> ({
    last: '',
    cur: '0'
  });  

  const [keyMap, setKeyMap] = useState("");
  
  
  function onPaste(event: any): void{
    if(event.isTrusted) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = event.clipboardData || (window as any).clipboardData;
      const pastedData = data.getData('Text') as string;
      let cur: string | unknown;
      replacement.forEach((item: any) => {     
        cur = pastedData.replace(item.dist, item.reg);     
      });      
      try {       
        setStateAndNotify({         
          cur: Number(evaluate(cur as string)).toString(),
          last: cur
        });
      } catch (e) {
        setStateAndNotify({
          cur,
          last: 'Not a valid expression'
        });
      }
    }
  }

  function setStateAndNotify(newState: any): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,  @typescript-eslint/no-unsafe-assignment  
    setState(props.onResultChange ? props.onResultChange({expression: newState.last, result: newState.cur}) : null);  
    setState(newState);
  }

  function handleKeyDown (event: React.KeyboardEvent): void {    
    let button;
    if(event.ctrlKey || event.keyCode === 67){
      return;
    }
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const key = (event.shiftKey ? 'shift+' : '') + event.keyCode || event.which;
    if ((button = keyMap[key]) !== null) {
      button.click();
      event.stopPropagation();
      event.preventDefault();
    }    
  }


  // eslint-disable-next-line complexity
  function onButtonClick(type: string): void {   
    const {cur} = state;
    const lastLetter = (cur).slice(-1);
    switch (type) {
      case 'c':
        setStateAndNotify({
          last: '',
          cur: '0'
        });
        break;
        case 'sqrt': {
          const sqrt = Math.sqrt(cur as unknown as number).toString();
          setStateAndNotify({
            last: '',
            cur: sqrt
          });
          break;
          }     
      case '=':
        try {
          console.log(cur);
          const output = evaluate(cur )
          setStateAndNotify({
            last: `${cur}=`,
            cur: output
          });
        } catch (e) {
          console.log(e);
          setState({
            last: `${cur}=`,
            cur: 'Not a valid expression'
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
          cur : type            
          });
          break;
        }
        if((lastLetter === '*' && type === '-') || (lastLetter === '/' && type=== '-')){
          setState({
            last: '',
            cur: cur + type
          });
          break;
        }

        if (lastLetter === '+' || lastLetter === '-' || lastLetter === '*' || lastLetter === '/')
          {setState({
            last: '',
            cur: (cur ).slice(0, -1) + type
          });}
        else
          {setState({
            last: '',
            cur: cur + type
          });}
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
       props.onNewInput({expression: state.cur, key: type});
      }
  }

 
    return (
      <div className="react-calculator"
        onPaste={onPaste} 
        onKeyDown={handleKeyDown} role="none">
        <ResultPanel {...state} />
        <ButtonPanel
          onClick={onButtonClick}         
          onLoad={setKeyMap}/>
      </div>
    );
  }

