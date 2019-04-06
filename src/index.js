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

		const xmlhttp =  new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				resolve(xmlhttp.responseText);
			}
		}
		xmlhttp.onerror(reject);
		xmlhttp.open('GET', Consts.GITHUB_SEARCH_PAGE_URL.replace('QUERY', badWord), true);
		xmlhttp.send();
	});
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