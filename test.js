import {fileURLToPath} from 'url';
import test from 'ava';
import extractStack from './index.js';

test('main', t => {
	const stack = [
		'Error: Message',
		'    at Test.t (test.js:1:1)',
		'    at Foo (test.js:3:1)'
	].join('\n');

	t.is(extractStack(stack), '    at Test.t (test.js:1:1)\n    at Foo (test.js:3:1)');
});

test('Error input', t => {
	const error = new Error('foo');

	const stack = [
		'Error: Message',
		'    at Test.t (test.js:1:1)'
	].join('\n');

	error.stack = stack;

	t.is(extractStack(error), '    at Test.t (test.js:1:1)');
});

test('strip multiline error message', t => {
	const stack = [
		'Error: Message',
		'with multiple',
		'lines',
		'',
		'    at Test.t (test.js:1:1)'
	].join('\n');

	t.is(extractStack(stack), '    at Test.t (test.js:1:1)');
});

test('includes anonymous function lines', t => {
	const stack = [
		'Error: Message',
		'    at path/to/test.js:1:1'
	].join('\n');

	t.is(extractStack(stack), '    at path/to/test.js:1:1');
});

test('includes anonymous function lines #2', t => {
	const getAnonymousFn = () => () => {
		throw new Error('foo');
	};

	let returnedError;

	try {
		getAnonymousFn()();
	} catch (error) {
		returnedError = error;
	}

	t.regex(extractStack.lines(returnedError.stack)[0].replace(fileURLToPath(import.meta.url), ''), /:\d+:\d+/);
});

test('.lines()', t => {
	const stack = [
		'Error: Message',
		'    at Test.t (test.js:1:1)',
		'    at Foo (test.js:3:1)'
	].join('\n');

	t.deepEqual(extractStack.lines(stack), ['Test.t (test.js:1:1)', 'Foo (test.js:3:1)']);
});
