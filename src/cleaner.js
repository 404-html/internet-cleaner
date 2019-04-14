export default {
	Clean(content, badWord, niceWord) {
		/**
		 * @description Make the first letter of a string uppercase
		 * @link https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
		 */
		const capitalizedBadWord = badWord.charAt(0).toUpperCase() + badWord.slice(1);

		if (content === badWord.toLowerCase()) {
			return niceWord.toLowerCase();
		}
		else if (content === badWord.toUpperCase()) {
			return niceWord.toUpperCase();
		}
		else if (content === capitalizedBadWord) {
			const capitalizedNiceWord = niceWord.charAt(0).toUpperCase() + niceWord.slice(1);
			return capitalizedNiceWord;
		}

		return content.replace(new RegExp(badWord, 'ig'), niceWord);
	}
}
