# extract-stack

> Extract the actual stack of an error

## Install

```
$ npm install extract-stack
```

## Usage

```js
import extractStack from 'extract-stack';

const error = new Error('Missing unicorn');

console.log(error.stack);
/*
Error: Missing unicorn
    at Object.<anonymous> (/Users/sindresorhus/dev/extract-stack/unicorn.js:2:15)
    at Module._compile (module.js:409:26)
    at Module.load (module.js:343:32)
    at startup (node.js:139:18)
*/

console.log(extractStack(error));
/*
    at Object.<anonymous> (/Users/sindresorhus/dev/extract-stack/unicorn.js:2:15)
    at Module._compile (module.js:409:26)
    at Module.load (module.js:343:32)
    at startup (node.js:139:18)
*/

console.log(extractStack.lines(error));
/*
[
	'Object.<anonymous> (/Users/sindresorhus/dev/extract-stack/unicorn.js:2:15)'
	'Module._compile (module.js:409:26)'
	'Module.load (module.js:343:32)'
	'startup (node.js:139:18)'
]
*/
```

## API

It gracefully handles cases where the stack is `undefined` or empty and returns an empty string.

### extractStack(error)

Returns the actual stack part of the error stack.

### extractStack.lines(error)

Returns the stack lines of the error stack without the noise as a `string[]`.

#### error

Type: `Error | string | undefined`

Either an `Error` or the `.stack` of an `Error`.

## Related

- [clean-stack](https://github.com/sindresorhus/clean-stack) - Clean up error stack traces
