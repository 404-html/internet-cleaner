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
		xmlhttp.open('GET',
			Consts.GITHUB_SEARCH_PAGE_URL
			.replace('QUERY', badWord)
			.replace('PAGE', Math.floor(Math.random() * 100) + 1), // random page number from 1 to 100
			true);
		xmlhttp.send();
	});
}

const pickRandomFile = (html) => {
	return new Promise((resolve, reject) => {
		const container = document.createElement('div');
		container.innerHTML = html;
		const files = container.querySelectorAll('.code-list-item');
		const fileIndex = Math.floor(Math.random() * files.length) + 1;
		const fileUrl = files[fileIndex].querySelector('a:nth-child(2)').href;
		window.location = fileUrl;
	});
}


askForBadWord()
	.then(fetchSearchResults)
	.then(pickRandomFile)
	.then(() => {
			console.log('I\'m done!');
		})
		.catch((ex) => {
			console.warn('Something went wrong! Bad side of Internet is defending itself...');
			console.warn(ex)
		});