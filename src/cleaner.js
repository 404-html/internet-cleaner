export default {
	Clean(content, badWord, niceWord) {
		const lowerCaseBadWord = badWord.toLowerCase();
		const upperCaseBadWord = badWord.toUpperCase();
		/**
		 * @description Make the first letter of a string uppercase
		 * @link https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
		 */
		const capitalizedBadWord = badWord.charAt(0).toUpperCase() + badWord.slice(1);
		const capitalizedNiceWord = niceWord.charAt(0).toUpperCase() + niceWord.slice(1);

		return content.replace(new RegExp(lowerCaseBadWord, 'g'), niceWord.toLowerCase())
			.replace(new RegExp(upperCaseBadWord, 'g'), niceWord.toUpperCase())
			.replace(new RegExp(capitalizedBadWord, 'g'), capitalizedNiceWord);
	}
}
