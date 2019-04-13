export default {
	Clean(content, badWord, niceWord) {
		return content.replace(new RegExp(badWord, 'ig'), niceWord);
	}
}