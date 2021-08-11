import { equal } from 'assert';
import validateInput from './validator';

it('Should throw warning if the string passed instead of a number', () => {
	equal(validateInput('something', 3), false);
});

it('Should throw warning if 2 strings are passed as arguments', () => {
	equal(validateInput('something', 'other'), false);
});

it('Success on using numbers', () => {
	equal(validateInput(3, 5), true);
});
