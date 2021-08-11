import {evaluate} from "../src/lib/MathEngine.tsx";

// eslint-disable-next-line no-undef
const assert = require('assert');

it('2+2 = 4', () => {
  assert.equal(evaluate(`2+2`), eval(4));
}); 
it('2+2+(13*5-5) = 64', () => {
	assert.equal(evaluate(`2+2+(13*5-5)`), eval(2+2+(13*5-5)));
  }); 
it('2+2*2 = 6', () => {
	assert.equal(evaluate(`2+2*2`), eval(2+2*2));
  }); 

it('1.4 * 0.5 * 1.2 * 1.0 = 0.84', () => {
	assert.equal(evaluate(`1.4 * 0.5 * 1.2 * 1.0`), eval(1.4 * 0.5 * 1.2 * 1.0));
  }); 

it('(69 + 2) * (3 / 4 - 15) = -1011.75', () => {
	assert.equal(evaluate(`(69 + 2) * (3 / 4 - 15)`), eval((69 + 2) * (3 / 4 - 15)));
  });


