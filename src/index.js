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

const fetchSearchResults = (badWord) => {
	return new Promise((resolve, reject) => {
		fetch(Consts.GITHUB_SEARCH_PAGE_URL.replace('QUERY', badWord))
			.then(function (response) {
				return response;
			})
			.then(function (response) {
				console.log(response);
			});
	})
}



askForBadWord()
.then(fetchSearchResults)
.then(() => {
		console.log('I\'m done!');
	})
	.catch((ex) => {
		console.warn('Something went wrong! Bad side of Internet is defending itself...');
		console.warn(ex)
	});