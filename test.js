import test from 'ava';
import m from '.';

test('main', t => {
	const stack = [
		'Error: Message',
		'    at Test.t (test.js:1:1)',
		'    at Foo (test.js:3:1)'
	].join('\n');

	t.is(m(stack), '    at Test.t (test.js:1:1)\n    at Foo (test.js:3:1)');
});

test('Error input', t => {
	const err = new Error();

	const stack = [
		'Error: Message',
		'    at Test.t (test.js:1:1)'
	].join('\n');

	err.stack = stack;

	t.is(m(err), '    at Test.t (test.js:1:1)');
});

test('strip multiline error message', t => {
	const stack = [
		'Error: Message',
		'with multiple',
		'lines',
		'',
		'    at Test.t (test.js:1:1)'
	].join('\n');

	t.is(m(stack), '    at Test.t (test.js:1:1)');
});

test('includes anonymous function lines', t => {
	const stack = [
		'Error: Message',
		'    at path/to/test.js:1:1'
	].join('\n');

	t.is(m(stack), '    at path/to/test.js:1:1');
});

test('includes anonymous function lines #2', t => {
	const getAnonymousFn = () => () => {
		throw new Error();
	};

	let retErr;

	try {
		getAnonymousFn()();
	} catch (err) {
		retErr = err;
	}

	t.regex(m.lines(retErr.stack)[0].replace(__filename, ''), /:\d+:\d+/);
});

test('.lines()', t => {
	const stack = [
		'Error: Message',
		'    at Test.t (test.js:1:1)',
		'    at Foo (test.js:3:1)'
	].join('\n');

	t.deepEqual(m.lines(stack), ['Test.t (test.js:1:1)', 'Foo (test.js:3:1)']);
});
