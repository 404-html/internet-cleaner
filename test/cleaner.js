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

test('LowerCase & UpperCase & Capitalized', t => {
    const testSentence = 'fcuk FCUK Fcuk';
    const expectValue = 'butterfly BUTTERFLY Butterfly'

    t.is(Cleaner.Clean(testSentence, badWord, niceWord), expectValue);
});

test('Mixed content from https://github.com/pythsourceproductions/AFR-Station/pull/1/files', t => {
    const testSentence = 'var/speak = pick("Grr...", "Fcuk...", "Fcuking...", "Fcuk this fcuking.. fcuk..")';
    const expectValue = 'var/speak = pick("Grr...", "Butterfly...", "Butterflying...", "Butterfly this butterflying.. butterfly..")';

    t.is(Cleaner.Clean(testSentence, badWord, niceWord), expectValue);
});
