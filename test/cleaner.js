import test from 'ava';
import { atob } from 'atob';

import Consts from '../src/const';
import Cleaner from '../src/cleaner';

const badWord = 'fcuk';
const niceWord = Consts.NICE_WORD;

test('LowerCase', t => {
    const testSentence = 'fcuk fack fcuk';
    const expectValue = 'butterfly fack butterfly'

    t.is(Cleaner.Clean(testSentence, badWord, niceWord), expectValue);
});

test('UpperCase', t => {
    const testSentence = 'FCUK FACK FCUK';
    const expectValue = 'BUTTERFLY FACK BUTTERFLY'

    t.is(Cleaner.Clean(testSentence, badWord, niceWord), expectValue);
});

test('Capitalized', t => {
    const testSentence = 'Fcuk Fack Fcuk';
    const expectValue = 'Butterfly Fack Butterfly'

    t.is(Cleaner.Clean(testSentence, badWord, niceWord), expectValue);
});

test('No bad word', t => {
    const testWord = 'beautiful word';
    t.is(Cleaner.Clean(testWord, badWord, niceWord), testWord);
});

test('Bad word of base64', t => {
    const decodedBadWord = atob(Consts.BAD_WORD);

    t.is(Cleaner.Clean(decodedBadWord, decodedBadWord, niceWord), niceWord.toLowerCase());
});
