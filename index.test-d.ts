import {expectType} from 'tsd';
import extractStack from './index.js';

const error = new Error('Missing unicorn');

expectType<string>(extractStack(error));
expectType<string>(extractStack(error.stack));
expectType<string[]>(extractStack.lines(error));
expectType<string[]>(extractStack.lines(error.stack));
