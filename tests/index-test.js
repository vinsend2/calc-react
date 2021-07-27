import {evaluate} from "../src/lib/MathEngine.js";
const assert = require('assert');



it('True', () => {
  assert.equal(evaluate(`2+2`), eval(4));
}); 
it('True', () => {
	assert.equal(evaluate(`2+2+(13*5-5)`), eval(2+2+(13*5-5)));
  }); 
it('True', () => {
	assert.equal(evaluate(`2+2*2`), eval(2+2*2));
  }); 

it('True', () => {
	assert.equal(evaluate(`1.4 * 0.5 * 1.2 * 1.0`), eval(1.4 * 0.5 * 1.2 * 1.0));
  }); 

it('Специальная ошибка, что бы проверить сам тестер =D', () => {
	assert.equal(evaluate(`(69 + 2) * (3 / 4 - 15)`), eval(2+2));
  });

it('True', () => {
	assert.equal(evaluate(`(69 + 2) * (3 / 4 - 15)`), eval((69 + 2) * (3 / 4 - 15)));
  });


