export const evaluate = getMathMain();


function getMathMain() {
  const math = getMath();  
  let divByZero = false;

  return applyMath;
  

  function applyMath(math_str) {
    divByZero = false;    
    delUnmatchedScopes(math_str);
    
    math_str = fullDeleteScopes(math_str);    
    math_str = autoCorrect(math_str);

    const result = parseLinearMath(math_str);
    return divByZero ? "Error" : result;
  }


  function fullDeleteScopes(str) {    
    str = autoCorrect(str);

        
    const index = str.indexOf("(");
    if( index === -1 ) return parseLinearMath(str);
    
    let scope = "(";
    let open = 1;
    
    for( let i = index + 1; i <= 100000; i++ ) {
      if( i === 100000 ) console.log("Infinite cycle");
      
      scope += str[i];
      
      if( str[i] === "(" ) {
        open++;
      } else if( str[i] === ")" ) {
        open--;
      }
      
      if( open === 0 ) {       
        // Показалось проще перезапускать функцию после каждой найденной скобки.
        // При этом учитывая и вложенные скобки scope.slice(1, -1)
        return fullDeleteScopes( str.replace(scope, fullDeleteScopes( scope.slice(1, -1) ) ) );
      }
    }
  }
  
  function parseLinearMath(math_str) { /* уже точно нет скобок */
    math_str = autoCorrect(math_str);
    math_str = mul_div(math_str);
    math_str = plus_minus(math_str);

    return math_str;
   

    function mul_div(math_str) {
      const length = (math_str.match(/\/|\*/g) || []).length;
      if (!length) return math_str;

      for (let i = 0; i < length; i++) {
        math_str = math_str.replace(
          /(\d+(?:\.\d+)?)(\/|\*)(-?\d+(?:\.\d+)?)/,
          function(_, a, oper, b) {
            return math(a, oper, b);
          }
        );

        math_str = autoCorrect(math_str);
        // Строка не из миллиона символов, поэтому после каждой операции
        // На всякий случай исправляется всё, что может пойти не так.      
      }

      return math_str;
    }
  
    function plus_minus(math_str) {
      
      const length = (math_str.match(/\+|-/g) || []).length;
      if (!length) return math_str;
      
      for (let i = 0; i < length; i++) {
        math_str = math_str.replace(
          /((?:^-)?\d+(?:\.\d+)?)(\+|-)(\d+(?:\.\d+)?)/,
          function(_, a, oper, b) {
            return math(a, oper, b);
          }
        );

        math_str = autoCorrect(math_str);
      }

      return math_str;
    }
  }
  

  function autoCorrect(math_str) {   
    const sqrt = value => {
      for (let i = 0; i <= value; i++) {
        if (i * i === value) return i;
      }     
     
    }; 
    return (math_str               // Замены:
      .replace(/\s/g, "")          // Удалить все пробелы
      .replace(/\(\)/g, "")        // Убрать пустые скобки
      .replace(/--/g, "+")         // Два минуса подряд → Плюс
      .replace(/(\+\+|\*\*|\/\/)/g, (_, oper) => oper[0])
               // Двойные плюсы, умножения и пр → на один
      .replace(/\+-|-\+/g, "-")    // Плюс после минуса и наоборот → на минус
      .replace(/\)\(/g, ")*(")     // Две скобки подряд → вставить умножение
      .replace(/(\d)\(/g, "$1*(")  // Число и сразу скобка → умножение
      .replace(/\)(\d)/g, ")*$1")  // Скобка и сразу число → умножение
      .replace(/(\/|\*)\+/g, "$1") // *+ или /+ → убрать плюс
      .replace(/%/g, "*(1/100)")   // Заменяем % на вычисление   
            
    );
    
  }

  function delUnmatchedScopes(math_str) {
    const scopes_open = (math_str.match(/\(/g) || []).length;
    const scopes_close = (math_str.match(/\)/g) || []).length;

    if (scopes_open !== scopes_close) {
      throw new Error("Unmatched parenthesis at " + math_str);
    }   
  }

  function getMath() {
    const local_math = {
      "+": (a, b) => Number(a) + Number(b),
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,      
      "/": (a, b) => {
        if( b === "0" ) {
          divByZero = true;
        }        
        return (a / b);
      }   
    };

    return function math(a, operation, b) {     
      return local_math[operation](a, b);
    };
  }
}
