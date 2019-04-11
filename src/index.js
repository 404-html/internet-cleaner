import Consts from './const'
import Utils from './utils'

let badWord = atob(Consts.BAD_WORD);
let niceWord = Consts.NICE_WORD;

const askForBadWord = () => {
	return new Promise((resolve, reject) => {
		badWord = prompt('Enter the word you want to get rid from Internet (leave empty to use custom):') || badWord;
		niceWord = prompt('Enter the word you want the previous world to be replaced with (leave empty to use custom):') || niceWord;
		resolve();
	});
}

const fetchSearchResults = () => {
	return new Promise((resolve, reject) => {

		const xmlhttp =  new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				resolve(xmlhttp.responseText);
			}
		}
		// TODO: reject on failure
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
		const container = Utils.CreateContainer(html);
		const files = container.querySelectorAll('.code-list-item');
		const fileIndex = Math.floor(Math.random() * files.length) + 1;
		let fileUrl = files[fileIndex].querySelector('a:nth-child(2)').href;

		fileUrl = fileUrl.split('/')
			.map((item, index) => {
				// if (index === 5) { return 'edit'; } 	// replace 'blob' with 'edit'
				if (index === 6) { return 'master'; } 	// replace blob GUID with master
				return item;
			}).join('/')
		resolve(fileUrl);
	});
}

const fetchFileForm = (url) => {
	return new Promise((resolve, reject) => {

		const xmlhttp =  new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				const container = Utils.CreateContainer(xmlhttp.responseText);
				const auth_token_input = container.querySelector('.octicon-pencil').parentElement.parentElement.querySelectorAll('input')[1];

				resolve({
					url,
					token: auth_token_input.value
				});
			}
		}
		// TODO: reject on failure
		xmlhttp.open('GET', url);
		xmlhttp.send();
	});
}

const fetchEditForm = (data) => {
	return new Promise((resolve, reject) => {

		const xmlhttp =  new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				resolve(xmlhttp.responseText);
			}
		}
		// TODO: reject on failure
		xmlhttp.open('POST', data.url.replace('/blob/', '/edit/'));
		var formData = new FormData();
		formData.append('utf8', '✓');
		formData.append('authenticity_token', data.token);
		xmlhttp.send(formData);
	});
}

const fetchProposeChangeForm = (html) => {
	return new Promise((resolve, reject) => {
		// extract all necessary data first

		html = html.replace(new RegExp(badWord, 'ig'), niceWord);
		document.open("text/html", "replace");
		document.write(html);
		document.close();

		// const container = Utils.CreateContainer(html);
		// const code = container.querySelector('.js-code-textarea').value;
		// console.log(code);



		resolve();
	});
}

askForBadWord()
	.then(fetchSearchResults)
	.then(pickRandomFile)
	.then(fetchFileForm)
	.then(fetchEditForm)
	.then(fetchProposeChangeForm)
	.then(() => {
			document.querySelector('#commit-description-textarea').value = 'Powered by Internet Cleaner ®'
			console.log('I\'m done!');
		})
		.catch((ex) => {
			console.warn('Something went wrong! Bad side of Internet is defending itself...');
			console.warn(ex)
		});