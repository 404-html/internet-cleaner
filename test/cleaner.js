import test from 'ava';
import { atob } from 'atob';

import Consts from '../src/const';
import Cleaner from '../src/cleaner';

const base64BadWord = Consts.BAD_WORD;
const niceWord = Consts.NICE_WORD;

test('LowerCase', t => {
    const testSentence = 'fuck fack fuck';
    const badWord = atob(base64BadWord);
    const expectValue = 'butterfly fack butterfly'

    t.is(Cleaner.Clean(testSentence, badWord, niceWord), expectValue);
});

test('UpperCase', t => {
    const testSentence = 'FUCK FACK FUCK';
    const badWord = atob(base64BadWord);
    const expectValue = 'BUTTERFLY FACK BUTTERFLY'

    t.is(Cleaner.Clean(testSentence, badWord, niceWord), expectValue);
});

test('Capitalized', t => {
    const testSentence = 'Fuck Fack Fuck';
    const badWord = atob(base64BadWord);
    const expectValue = 'Butterfly Fack Butterfly'

    t.is(Cleaner.Clean(testSentence, badWord, niceWord), expectValue);
});

test('No bad word', t => {
    const testWord = 'beautiful word';
    const badWord = atob(base64BadWord);

    t.is(Cleaner.Clean(testWord, badWord, niceWord), testWord);
});

test('Bad word of base64', t => {
    const badWord = atob(base64BadWord);

    t.is(Cleaner.Clean(badWord, badWord, niceWord), niceWord.toLowerCase());
});
