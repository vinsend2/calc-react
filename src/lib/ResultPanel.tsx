import React from 'react';


export const replacement = [
  {
    reg: /\*/g,
    dest: '×'
  },
   {
    reg: /\//g,
    dest: '÷'
  },
  {
    reg: /[=]/g,
    dest: ''
  }
  
  
];
interface ResultPanelProps {
	last: string;
  cur: string;
}

export const ResultPanel: React.FC<ResultPanelProps> = props => {
  
    const {last, cur} = props;
    let finalCur = cur, finalLast = last;
    replacement.forEach(item => {
      finalCur = finalCur.replace(item.reg, item.dest);
      finalLast = finalLast.replace(item.reg, item.dest);
    });

    return (
      <div className="result-panel">
        <div className="last-row">{finalLast}</div>
        <input className="cur-row" value={finalCur} readOnly />
      </div>
    );
  }

