import test from 'ava';
import { atob } from 'atob';

import Consts from '../src/const';
import Cleaner from '../src/cleaner';

const base64BadWord = Consts.BAD_WORD;
const niceWord = Consts.NICE_WORD;

test('LowerCase', t => {
    const badWord = 'fuck';

    t.is(Cleaner.Clean(badWord, badWord, niceWord), niceWord.toLowerCase());
});

test('UpperCase', t => {
    const badWord = 'FUCK';

    t.is(Cleaner.Clean(badWord, badWord, niceWord), niceWord.toUpperCase());
});

test('Capitalized', t => {
    const badWord = 'Fuck';
    const capitalizedNiceWord = niceWord.charAt(0).toUpperCase() + niceWord.slice(1);

    t.is(Cleaner.Clean(badWord, badWord, niceWord), capitalizedNiceWord);
});

test('No bad word', t => {
    const testWord = 'BeautifulWord';
    const badWord = 'Fuck';

    t.is(Cleaner.Clean(testWord, badWord, niceWord), testWord);
});

test('Bad word of base64', t => {
    const badWord = atob(base64BadWord);

    t.is(Cleaner.Clean(badWord, badWord, niceWord), niceWord.toLowerCase());
});
