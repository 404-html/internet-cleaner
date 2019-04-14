import test from 'ava';

import Consts from '../src/const';
import Cleaner from '../src/cleaner';

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
