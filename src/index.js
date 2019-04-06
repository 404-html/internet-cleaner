import Consts from './const'

const askForBadWord = () => {
	return new Promise((resolve, reject) => {
		const badWord = prompt('Enter the word you want to get rid from Internet:')
		if(badWord) {
			resolve(badWord);
		} else {
			reject();
		}
	});
}

const navigateToSearchPage = (badWord) => {
	return new Promise((resolve, reject) => {
		document.addEventListener('DOMContentLoaded', resolve, false);
		window.location = Consts.GITHUB_SEARCH_PAGE_URL.replace('QUERY', badWord);
		setTimeout(() => {
			console.log('okokS');
		}, 3000);
	})
}



askForBadWord()
.then(navigateToSearchPage)
.then(() => {
		console.log('I\'m done!');
	})
	.catch((ex) => {
		console.warn('Something went wrong! Bad side of Internet is defending itself...');
		console.warn(ex)
	});