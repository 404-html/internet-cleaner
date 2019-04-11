export default {
	CreateContainer: (html) => {
		const container = document.createElement('div');
		container.innerHTML = html;
		return container;
	}
}