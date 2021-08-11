 // eslint-disable-next-line complexity
 export default function performOperator(data: any): void{
  const {type, setStateAndNotify, evaluate, setState, cur, lastLetter} = data
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
}